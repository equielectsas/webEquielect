"use client";
import { useState, useEffect } from "react";
import { Search, Calendar, MapPin, Clock, X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    email: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
    setSelectedEvent(event);
    setIsModalOpen(true);
    setIsFormSubmitted(false);
    setFormData({ name: "", email: "" });
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

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
      closeImageModal();
    }
  };

  const getEventStatus = (date) => {
    const eventDate = new Date(date);
    const today = new Date();
    return eventDate > today ? "Próximo" : "Realizado";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/eventos/${selectedEvent._id}/inscribir`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la inscripción");
      }

      const correoResponse = await fetch(
        "${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/eventos/enviar-correo-inscripcion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
            eventId: selectedEvent._id,
          }),
        },
      );

      if (!correoResponse.ok) throw new Error("Error al enviar el correo");

      toast.success(
        "¡Inscripción exitosa! Se ha enviado un correo de confirmación.",
      );
      setIsFormSubmitted(true);
      closeModal();
      fetchEventos();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
        closeImageModal();
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
                  <button
                    onClick={() => openModal(event)}
                    className="bg-transparent border-[1px] border-[#98989A] text-black px-[8px] py-[6px] text-sm semi-bold cursor-pointer transition-all duration-200 hover:bg-[#98989A] hover:text-white"
                  >
                    Ver más
                  </button>
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
              {selectedEvent ? selectedEvent.name : "Nuevo Evento"}
            </h2>
            {selectedEvent && (
              <div className="space-y-4">
                <img
                  src={selectedEvent.image || "/placeholder.svg"}
                  alt={selectedEvent.name}
                  className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer"
                  onClick={() => openImageModal(selectedEvent.image)}
                />
                <p className="text-gray-600">{selectedEvent.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2 w-4 h-4" />{" "}
                    {formatDate(selectedEvent.date)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-2 w-4 h-4" /> {selectedEvent.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="mr-2 w-4 h-4" /> {selectedEvent.location}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      getEventStatus(selectedEvent.date) === "Próximo"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {getEventStatus(selectedEvent.date)}
                  </span>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                    {selectedEvent.category}
                  </span>
                </div>

                {getEventStatus(selectedEvent.date) === "Próximo" && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">
                      Formulario de inscripción
                    </h3>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="block text-gray-700">
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700">
                          Correo Electrónico
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Inscribirse
                      </button>
                    </form>
                    {isFormSubmitted && (
                      <p className="text-green-500 mt-2">
                        Inscripción exitosa. ¡Nos vemos en el evento!
                      </p>
                    )}
                  </div>
                )}

                {getEventStatus(selectedEvent.date) === "Realizado" && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">
                      Fotos del Evento
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedEvent.postEventImages.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Evento ${selectedEvent.name} ${index}`}
                          className="w-full h-32 object-cover rounded-lg cursor-pointer"
                          onClick={() => openImageModal(img)}
                        />
                      ))}
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold mb-2">Reseña</h3>
                      <p
                        className="text-gray-600 overflow-y-auto max-h-40"
                        style={{ wordWrap: "break-word" }}
                      >
                        {selectedEvent.postEventComment}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center p-4 z-20"
          onClick={handleOutsideClick}
        >
          <div className="rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeImageModal}
              className="absolute top-2 right-2 text-white hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt="Imagen del evento"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
