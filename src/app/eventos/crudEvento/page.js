"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  X,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const isoToDateInput = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function EventosPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    image: "",
    date: "",
    time: "",
    location: "",
    category: "",
    postEventImages: [],
    postEventComment: "",
  });
  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false); // Nuevo estado para el modal de "Ver más"

  const fetchEventos = async () => {
    try {
      const response = await fetch(
        "${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/eventos",
      );
      const data = await response.json();
      const sortedEvents = data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        const today = new Date();

        if (dateA > today && dateB > today) {
          return dateA - dateB;
        }

        if (dateA > today) return -1;
        if (dateB > today) return 1;

        return dateB - dateA;
      });
      setEvents(sortedEvents);
      setFilteredEvents(sortedEvents);
    } catch (error) {
      toast.error("Error al cargar los eventos");
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const results = events.filter(
      (event) =>
        event.name.toLowerCase().includes(query.toLowerCase()) ||
        event.category.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredEvents(results);
  };

  const openModal = (event = null) => {
    if (event) {
      setFormData({
        ...event,
        date: isoToDateInput(event.date),
      });
      setSelectedEvent(event);
    } else {
      setFormData({
        name: "",
        shortDescription: "",
        description: "",
        image: "",
        date: "",
        time: "",
        location: "",
        category: "",
        postEventImages: [],
        postEventComment: "",
      });
      setSelectedEvent(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage("");
  };

  const openViewMoreModal = (event) => {
    setSelectedEvent(event);
    setIsViewMoreModalOpen(true);
  };

  const closeViewMoreModal = () => {
    setIsViewMoreModalOpen(false);
    setSelectedEvent(null);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
      closeImageModal();
      closeViewMoreModal();
    }
  };

  const getEventStatus = (date) => {
    const eventDate = new Date(date);
    const today = new Date();
    return eventDate > today ? "Próximo" : "Realizado";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedEvent
        ? `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/eventos/${selectedEvent._id}`
        : "${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/eventos";

      const method = selectedEvent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error en la operación");

      toast.success(selectedEvent ? "Evento actualizado" : "Evento creado");
      setIsModalOpen(false);
      setSelectedEvent(null);
      fetchEventos(); // Recargar la lista de eventos
    } catch (error) {
      toast.error("Error al procesar la operación");
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/eventos/${eventId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) throw new Error("Error al eliminar el evento");

      toast.success("Evento eliminado");
      fetchEventos(); // Recargar la lista de eventos
    } catch (error) {
      toast.error("Error al eliminar el evento");
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
        closeImageModal();
        closeViewMoreModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Eventos <span className="text-yellow-700">Equielect</span>
        </h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Evento
        </button>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchQuery}
          placeholder="Buscar eventos por nombre o categoría..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No se encontraron eventos. Intenta con otra búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col"
            >
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => openImageModal(event.image)}
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                <p className="text-gray-600 mb-4">{event.shortDescription}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2 w-4 h-4" />{" "}
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-2 w-4 h-4" /> {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="mr-2 w-4 h-4" /> {event.location}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        getEventStatus(event.date) === "Próximo"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {getEventStatus(event.date)}
                    </span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(event)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button
                      onClick={() => openViewMoreModal(event)}
                      className="bg-transparent border-[1px] border-[#98989A] text-black px-[8px] py-[6px] text-sm semi-bold cursor-pointer transition-all duration-200 hover:bg-[#98989A] hover:text-white"
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10"
          onClick={handleOutsideClick}
        >
          <div className="bg-white rounded-sm p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {selectedEvent ? "Editar Evento" : "Nuevo Evento"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Descripción Corta
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shortDescription: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Descripción Larga
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  URL de la Imagen Principal
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fecha</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hora</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Ubicación
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Categoría
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  URLs de Imágenes Post-Evento
                </label>
                {formData.postEventImages.map((img, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={img}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          postEventImages: formData.postEventImages.map(
                            (i, idx) => (idx === index ? e.target.value : i),
                          ),
                        })
                      }
                      className="w-full border rounded-lg p-2"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          postEventImages: formData.postEventImages.filter(
                            (_, i) => i !== index,
                          ),
                        })
                      }
                      className="text-red-500"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      postEventImages: [...formData.postEventImages, ""],
                    })
                  }
                  className="text-blue-500"
                >
                  Añadir Imagen
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Comentarios Post-Evento
                </label>
                <textarea
                  value={formData.postEventComment}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      postEventComment: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4"
              >
                {selectedEvent ? "Actualizar Evento" : "Crear Evento"}
              </button>
            </form>
          </div>
        </div>
      )}

      {isViewMoreModalOpen && selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10"
          onClick={handleOutsideClick}
        >
          <div className="bg-white rounded-sm p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeViewMoreModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Personas Inscritas</h2>
            {selectedEvent.inscritos && selectedEvent.inscritos.length > 0 ? (
              <div className="mt-4">
                <p className="text-gray-600 mb-4">
                  Total de inscritos: {selectedEvent.inscritos.length}
                </p>
                <ul>
                  {selectedEvent.inscritos.map((inscrito, index) => (
                    <li key={index} className="mb-2">
                      <strong>{inscrito.name}</strong> - {inscrito.email}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-600">
                No hay personas inscritas en este evento.
              </p>
            )}
          </div>
        </div>
      )}

      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
          onClick={closeImageModal}
        >
          <div className="bg-white p-6 max-w-xl max-h-[80vh] overflow-auto">
            <img
              src={selectedImage}
              alt="Imagen del evento"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
//todos los crud se pueden componetizar, utilizan los mismos elementos, tareita que no alcance a hacer :)
