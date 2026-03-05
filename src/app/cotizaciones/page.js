"use client";
import { useState } from "react";
import DateFilter from "../../components/utils/DateFilter/DateFilter";
import MessageModal from "../../components/utils/Modals/MessageModal/MessageModal";
import Loading from "../../components/utils/Loading/Loading";
const Cotizaciones = () => {
  const [filteredCotizaciones, setFilteredCotizaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchFilteredCotizaciones = async (startDate, endDate) => {
    if (!startDate || !endDate) {
      setFilteredCotizaciones([]);
      return;
    }

    const start = new Date(`${startDate}T00:00:00`).toISOString();
    const end = new Date(`${endDate}T23:59:59`).toISOString();

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/cotizaciones?startDate=${start}&endDate=${end}`,
      );
      const data = await response.json();
      if (response.ok) {
        setFilteredCotizaciones(data.data);
      } else {
        console.error("Error al cargar las cotizaciones:", data.error);
        setFilteredCotizaciones([]);
      }
    } catch (error) {
      console.error("Error de red:", error);
      setFilteredCotizaciones([]);
    } finally {
      setLoading(false);
    }
  };

  const setStatus = async (index, status) => {
    const cotizacionId = filteredCotizaciones[index]._id;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/cotizacion/${cotizacionId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        setFilteredCotizaciones((prevCotizaciones) =>
          prevCotizaciones.map((cotizacion, i) =>
            i === index
              ? { ...cotizacion, status: data.data.status }
              : cotizacion,
          ),
        );
      } else {
        console.error("Error al actualizar el estado:", await response.json());
      }
    } catch (error) {
      console.error("Error de red al actualizar el estado:", error);
    }
  };

  const clearStatus = async (index) => {
    await setStatus(index, null);
  };

  const openModal = (message) => {
    setSelectedMessage(message);
  };

  const closeModal = () => {
    setSelectedMessage(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mx-6 md:mx-20 lg:mx-40">
      <h1 className="text-2xl semi-bold mb-5">Cotizaciones</h1>
      <DateFilter onFilter={fetchFilteredCotizaciones} />

      {filteredCotizaciones.length === 0 ? (
        <div className="mt-4 text-gray-700">
          <p>No hay Cotizaciones.</p>
          <p>Filtra por rango de fechas para buscar otros días.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredCotizaciones.map((cotizacion, index) => (
            <div
              key={cotizacion._id}
              className={`shadow-md p-4 relative ${
                cotizacion.status === "respondido"
                  ? "bg-green-100"
                  : cotizacion.status === "porResponder"
                    ? "bg-red-100"
                    : "bg-gray-200"
              }`}
            >
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                {cotizacion.status === null ? (
                  <button
                    onClick={() => setStatus(index, "prompt")}
                    className="bg-transparent border-[1px] border-[#98989A] text-black px-[8px] py-[6px] text-sm semi-bold cursor-pointer transition-all duration-200 hover:bg-[#98989A] hover:text-white ml-4"
                  >
                    ¿respondiste?
                  </button>
                ) : cotizacion.status === "prompt" ? (
                  <>
                    <button
                      onClick={() => setStatus(index, "respondido")}
                      className="bg-transparent border-[1px] border-[#98989A] text-black px-[8px] py-[8px] text-sm semi-bold cursor-pointer transition-all duration-200 hover:bg-[#98989A] hover:text-white ml-8 mr-3"
                    >
                      Sí
                    </button>
                    <button
                      onClick={() => setStatus(index, "porResponder")}
                      className="bg-transparent border-[1px] border-[#98989A] text-black px-[5px] py-[8px] text-sm semi-bold cursor-pointer transition-all duration-200 hover:bg-[#98989A] hover:text-white"
                    >
                      No
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      className={`semi-bold ${
                        cotizacion.status === "respondido"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {cotizacion.status === "respondido"
                        ? "Respondido"
                        : "Por responder"}
                    </span>
                    <button
                      onClick={() => clearStatus(index)}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      ✕
                    </button>
                  </>
                )}
              </div>

              <h2 className="text-lg semi-bold mb-2">Cotización</h2>
              <p>
                <span className="text-xs font-bold">Usuario :</span>{" "}
                {cotizacion.userInfo.name} {cotizacion.userInfo.lastname}
              </p>
              <p>
                <span className="text-xs font-bold">Email :</span>{" "}
                {cotizacion.userInfo.email}
              </p>
              <p>
                <span className="font-bold text-xs">Teléfono :</span>{" "}
                {cotizacion.userInfo.phone}
              </p>
              <p>
                <span className=" font-bold text-xs">Mensaje :</span>{" "}
                <span
                  className="truncate block max-w-full overflow-hidden whitespace-nowrap text-ellipsis"
                  style={{ maxWidth: "100%" }}
                >
                  {cotizacion.userInfo.message.length > 40
                    ? `${cotizacion.userInfo.message.slice(0, 40)}...`
                    : cotizacion.userInfo.message}
                </span>
                {cotizacion.userInfo.message.length > 40 && (
                  <button
                    className="text-sm text-yellow-800 hover:underline"
                    onClick={() => openModal(cotizacion.userInfo)}
                  >
                    Ver más
                  </button>
                )}
              </p>
              <p>
                <span className="font-bold text-xs">Fecha :</span>{" "}
                {new Date(cotizacion.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-4">
                <h3 className="mb-2  text-xs font-bold">Productos:</h3>
                <table className="table-auto w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2">Modelo</th>
                      <th className="border px-4 py-2">Nombre</th>

                      <th className="border px-4 py-2">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cotizacion.cotizacionProducts.map((product, i) => (
                      <tr key={i}>
                        <td className="border px-4 py-2">{product.model}</td>
                        <td className="border px-4 py-2">{product.name}</td>

                        <td className="border px-4 py-2">{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMessage && (
        <MessageModal message={selectedMessage} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Cotizaciones;
