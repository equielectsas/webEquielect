"use client";
import { useState, useEffect } from "react";
import DateFilter from "@/components/utils/DateFilter/DateFilter";
import MessageModal from "@/components/utils/Modals/MessageModal/MessageModal";
import Loading from "../../components/utils/Loading/Loading";

const ListMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const openModal = (message) => {
    setSelectedMessage(message);
  };

  const closeModal = () => {
    setSelectedMessage(null);
  };

  // Función para actualizar el estado de un mensaje
  const setStatus = async (index, status) => {
    const messageToUpdate = filteredMessages[index];
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/mensajes/actualizar/${messageToUpdate._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );

      if (response.ok) {
        setFilteredMessages((prevMessages) =>
          prevMessages.map((msg, i) =>
            i === index ? { ...msg, status } : msg,
          ),
        );
      } else {
        console.error("Error al actualizar el estado:", await response.json());
      }
    } catch (error) {
      console.error("Error en la solicitud para actualizar el estado:", error);
    } finally {
      setEditingIndex(null);
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
  };

  // Función para filtrar mensajes por fecha
  const handleFilter = async (startDate, endDate) => {
    if (startDate && endDate) {
      setLoading(true);
      try {
        const start = new Date(`${startDate}T00:00:00`).toISOString();
        const end = new Date(`${endDate}T23:59:59`).toISOString();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/mensajes/listar?createdAt[gte]=${start}&createdAt[lte]=${end}`,
        );

        if (!response.ok) {
          throw new Error("Error al filtrar mensajes");
        }

        const data = await response.json();

        if (data.success) {
          const messagesWithDate = data.datos.map((msg) => ({
            ...msg,
            date: new Date(msg.createdAt),
          }));
          setMessages(messagesWithDate);
          setFilteredMessages(messagesWithDate);
        } else {
          console.error(data.mensaje);
        }
      } catch (error) {
        console.error("Error al filtrar mensajes:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Ambas fechas son requeridas");
    }
  };

  // Cargar mensajes al montar el componente
  useEffect(() => {
    const loadInitialMessages = async () => {
      setLoading(true);
      try {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        await handleFilter(
          firstDay.toISOString().split("T")[0],
          lastDay.toISOString().split("T")[0],
        );
      } catch (error) {
        console.error("Error al cargar mensajes iniciales:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialMessages();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl semi-bold mb-4">Mensajes</h1>

      <DateFilter onFilter={handleFilter} />

      {filteredMessages.length === 0 ? (
        <div className="mt-4 text-gray-700">
          <p>No hay mensajes.</p>
          <p>Filtra por rango de fechas para buscar otros días.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Apellido</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Teléfono</th>
                <th className="border px-4 py-2">Mensaje</th>
                <th className="border px-4 py-2">Fecha</th>
                <th className="border px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((message, index) => (
                <tr
                  key={index}
                  className={
                    message.status === "respondido"
                      ? "bg-green-100"
                      : message.status === "porResponder"
                        ? "bg-red-100"
                        : ""
                  }
                >
                  <td className="border px-4 py-2">{message.name}</td>
                  <td className="border px-4 py-2">{message.lastname}</td>
                  <td className="border px-4 py-2">{message.email}</td>
                  <td className="border px-4 py-2">
                    {message.phone ? message.phone : "No proporcionado"}
                  </td>
                  <td className="border px-4 py-2 max-w-xs">
                    <div className="flex flex-col">
                      <p
                        className="truncate"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          overflow: "hidden",
                        }}
                      >
                        {message.message}
                      </p>
                      {message.message.length > 40 && (
                        <button
                          className="text-sm text-yellow-800 hover:underline mt-1 self-start"
                          onClick={() => openModal(message)}
                        >
                          Ver más
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 relative">
                    {editingIndex === index ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setStatus(index, "respondido")}
                          className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                        >
                          Sí
                        </button>
                        <button
                          onClick={() => setStatus(index, "porResponder")}
                          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                        >
                          No
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="text-gray-500 hover:text-gray-800"
                        >
                          ✕
                        </button>
                      </div>
                    ) : message.status === null ? (
                      <button
                        onClick={() => startEditing(index)}
                        className="bg-transparent border-[1px] border-[#98989A] text-black px-[8px] py-[6px] text-sm semi-bold cursor-pointer transition-all duration-200 hover:bg-[#98989A] hover:text-white"
                      >
                        ¿Respondiste?
                      </button>
                    ) : (
                      <div>
                        <span
                          className={`block ${
                            message.status === "respondido"
                              ? "text-green-500"
                              : "text-red-500"
                          } semi-bold`}
                        >
                          {message.status === "respondido"
                            ? "Respondido"
                            : "Por responder"}
                        </span>
                        <button
                          onClick={() => setStatus(index, null)}
                          className="absolute top-0 right-0 text-gray-500 hover:text-gray-800 mr-1"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedMessage && (
        <MessageModal message={selectedMessage} closeModal={closeModal} />
      )}
    </div>
  );
};

export default ListMessagesPage;
