"use client";
import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CrudAliadosPage() {
  const [allies, setAllies] = useState([]);
  const [selectedAlly, setSelectedAlly] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    allyLink: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchAllies();
  }, []);

  const fetchAllies = async () => {
    try {
      const response = await fetch("http://localhost:3900/api/aliados");
      if (!response.ok) {
        throw new Error("Error al obtener los aliados");
      }
      const data = await response.json();
      setAllies(data);
    } catch (error) {
      toast.error("Error al cargar los aliados");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedAlly
        ? `http://localhost:3900/api/aliados/${selectedAlly._id}`
        : "http://localhost:3900/api/aliados";

      const method = selectedAlly ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error en la operación");

      toast.success(
        selectedAlly ? "Aliado actualizado" : "Aliado creado"
      );
      setIsModalOpen(false);
      setSelectedAlly(null);
      fetchAllies();
    } catch (error) {
      toast.error("Error al procesar la operación");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Está seguro de eliminar este aliado?")) return;

    try {
      const response = await fetch(
        `http://localhost:3900/api/aliados/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Error al eliminar");

      toast.success("Aliado eliminado");
      fetchAllies();
    } catch (error) {
      toast.error("Error al eliminar el aliado");
    }
  };

  const openModal = (ally = null) => {
    if (ally) {
      setFormData(ally);
      setSelectedAlly(ally);
    } else {
      setFormData({
        name: "",
        description: "",
        allyLink: "",
        imageUrl: "",
      });
      setSelectedAlly(null);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Aliados</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Aliado
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allies.map((ally) => (
          <div key={ally._id} className="border rounded-lg p-4 shadow">
            <img
              src={ally.imageUrl}
              alt={ally.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{ally.name}</h2>
            <p className="text-gray-600 mb-4">{ally.description}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => openModal(ally)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(ally._id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {selectedAlly ? "Editar Aliado" : "Nuevo Aliado"}
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
                  Descripción
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
                  Enlace del Aliado
                </label>
                <input
                  type="text"
                  value={formData.allyLink}
                  onChange={(e) =>
                    setFormData({ ...formData, allyLink: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  URL de la Imagen
                </label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  {selectedAlly ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

//todos los crud se pueden componetizar, utilizan los mismos elementos, tareita que no alcance a hacer :)