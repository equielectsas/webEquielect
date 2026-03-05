"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "@/components/products/SearchBar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3900";

function ProductosPageInner() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const emptyForm = {
    model: "",
    name: "",
    descripcion: "",
    features: [],
    Especificaciones: {},
    reference: "",
    brand: "",
    Category: "",
    subcategory: "",
    images: [],
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/productos`, {
        cache: "no-store",
      });
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
      setFilteredProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Error al cargar los productos");
    }
  };

  const handleSearch = (results) => {
    setFilteredProducts(Array.isArray(results) ? results : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedProduct
        ? `${API_URL}/api/productos/${selectedProduct._id}`
        : `${API_URL}/api/productos`;

      const method = selectedProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error en la operación");

      toast.success(selectedProduct ? "Producto actualizado" : "Producto creado");
      setIsModalOpen(false);
      setSelectedProduct(null);
      setFormData(emptyForm);
      fetchProducts();
    } catch (error) {
      toast.error("Error al procesar la operación");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Está seguro de eliminar este producto?")) return;

    try {
      const response = await fetch(`${API_URL}/api/productos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar");

      toast.success("Producto eliminado");
      fetchProducts();
    } catch (error) {
      toast.error("Error al eliminar el producto");
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setFormData(product);
      setSelectedProduct(product);
    } else {
      setFormData(emptyForm);
      setSelectedProduct(null);
    }
    setIsModalOpen(true);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleEspecificacionChange = (field, value) => {
    setFormData({
      ...formData,
      Especificaciones: {
        ...(formData.Especificaciones || {}),
        [field]: value,
      },
    });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...(formData.images || [])];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Producto
        </button>
      </div>

      {/* Si SearchBar usa useSearchParams, esto queda protegido por Suspense arriba */}
      <SearchBar onSearch={handleSearch} products={products} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product?._id} className="border rounded-lg p-4 shadow">
            {!!product?.images?.[0] && (
              <img
                src={product.images[0]}
                alt={product?.name || "Producto"}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{product?.name}</h2>
            <p className="text-gray-600 mb-4">{product?.descripcion}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => openModal(product)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(product._id)}
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
              {selectedProduct ? "Editar Producto" : "Nuevo Producto"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Modelo</label>
                <input
                  type="text"
                  value={formData.model || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                  value={formData.descripcion || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Características</label>
                {(formData.features || []).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feature || ""}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="w-full border rounded-lg p-2"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          features: (formData.features || []).filter((_, i) => i !== index),
                        })
                      }
                      className="text-red-500"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      features: [...(formData.features || []), ""],
                    })
                  }
                  className="text-blue-500"
                >
                  Agregar característica
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Especificaciones</label>
                {Object.entries(formData.Especificaciones || {}).map(([key, value], index) => (
                  <div key={index} className="space-y-2 mb-4">
                    <input
                      type="text"
                      value={key || ""}
                      onChange={(e) => {
                        const newEspecificaciones = { ...(formData.Especificaciones || {}) };
                        delete newEspecificaciones[key];
                        newEspecificaciones[e.target.value] = value;
                        setFormData({ ...formData, Especificaciones: newEspecificaciones });
                      }}
                      className="w-full border rounded-lg p-2"
                      placeholder="Nombre de la especificación"
                    />

                    <textarea
                      value={value || ""}
                      onChange={(e) => handleEspecificacionChange(key, e.target.value)}
                      className="w-full border rounded-lg p-2"
                      placeholder="Valor de la especificación"
                      rows={3}
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const newEspecificaciones = { ...(formData.Especificaciones || {}) };
                        delete newEspecificaciones[key];
                        setFormData({ ...formData, Especificaciones: newEspecificaciones });
                      }}
                      className="text-red-500"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      Especificaciones: { ...(formData.Especificaciones || {}), "": "" },
                    })
                  }
                  className="text-blue-500"
                >
                  Agregar especificación
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Referencia</label>
                <input
                  type="text"
                  value={formData.reference || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, reference: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Marca</label>
                <input
                  type="text"
                  value={formData.brand || ""}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Categoría</label>
                <input
                  type="text"
                  value={formData.Category || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, Category: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Subcategoría</label>
                <input
                  type="text"
                  value={formData.subcategory || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, subcategory: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Imágenes</label>
                {(formData.images || []).map((image, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={image || ""}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="w-full border rounded-lg p-2"
                      placeholder="URL de imagen"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          images: (formData.images || []).filter((_, i) => i !== index),
                        })
                      }
                      className="text-red-500"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, images: [...(formData.images || []), ""] })
                  }
                  className="text-blue-500"
                >
                  Agregar imagen
                </button>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                  {selectedProduct ? "Actualizar" : "Crear"}
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

export default function ProductosPage() {
  return (
    <Suspense fallback={<div className="p-4">Cargando...</div>}>
      <ProductosPageInner />
    </Suspense>
  );
}