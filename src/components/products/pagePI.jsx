"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  ShoppingCart,
  ZoomIn,
} from "lucide-react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
  Typography,
} from "@material-tailwind/react";
import Counter from "@/components/utils/Counter/Counter";
import APIproducts from "@/services/products.services";
import { ACTIONS } from "@/constants/ACTIONS";
import ToastMessage from "@/components/utils/Toastify/ToastMessage";
import AllyCard from "@/components/ui/AllyCard";
import ProductCarousel from "@/components/products/ProductCarousel";

const PDPPage = () => {
  const { pid } = useParams();


  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isMessageAvailable, setIsMessageAvailable] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [activeTab, setActiveTab] = useState("description");
  const [openModal, setOpenModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const [allyInfo, setAllyInfo] = useState(null);

const fetchAllyByBrand = async (brand) => {
  try {
    const response = await fetch(`http://localhost:3900/api/aliados?brand=${brand}`); 
    if (!response.ok) {
      throw new Error("Error al obtener el aliado");
    }
    const data = await response.json();
    if (data.length > 0) {
      setAllyInfo(data[0]); 
    } else {
      console.warn(`No se encontró un aliado para la marca: ${brand}`);
      setAllyInfo(null); 
    }
  } catch (error) {
    console.error("Error fetching ally:", error);
  }
};

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await APIproducts.getProductById(pid);
  
        if (!data) {
          throw new Error("Producto no encontrado");
        }
  
        setProduct(data);
  
        console.log("Marca del producto:", data.brand);
  
        if (data.brand) {
          await fetchAllyByBrand(data.brand.toLowerCase());
        }
      } catch (error) {
        setError(error.message || "Error al obtener el producto");
      } finally {
        setIsLoading(false);
      }
    };
  
    if (pid) {
      fetchProduct();
    }
  }, [pid]);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsMessageAvailable(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [isMessageAvailable]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product?.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleOpenModal = (url) => {
    setPdfUrl(url);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setPdfUrl(null);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product?.images.length - 1 : prev - 1
    );
  };

  const handleMouseMove = (e) => {
    if (isZoomed) {
      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = ((e.pageX - left) / width) * 100;
      const y = ((e.pageY - top) / height) * 100;
      setMousePosition({ x, y });
    }
  };

  const handleAddToCart = () => {
    dispatch({
      type: ACTIONS.addProductToCotizacion,
      payload: {
        ...product,
        image: product.images[currentImageIndex],
        quantity,
      },
    });
    console.log("estado de cotizacion despues de agregar producto:", state);
    setIsMessageAvailable(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFCD00]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h5" color="red" className="text-center">
          {error}
        </Typography>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h5" className="text-gray-500">
          Producto no encontrado
        </Typography>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <div className="relative h-[500px] rounded-xl overflow-hidden group">
            <div
              className={`relative w-full h-full transition-transform duration-300 ${
                isZoomed ? "scale-150" : ""
              }`}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              style={{
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
              }}
            >
              <img
                src={product.images[currentImageIndex]}
                alt={`Vista del producto ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full 
                       shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full 
                       shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {isZoomed && (
              <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-full">
                <ZoomIn className="w-5 h-5" />
              </div>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 pt-2 pl-1">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden 
                          ${
                            currentImageIndex === index
                              ? "ring-2 ring-[#FFCD00]"
                              : "ring-1 ring-gray-200"
                          }`}
              >
                <img
                  src={image}
                  alt={`Miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <Typography
              variant="small"
              color="gray"
              className="mb-2 flex items-center"
            >
              {product.brand}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#52abff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </Typography>

            <Typography variant="h3" className="font-bold mb-2">
              {product.name}
            </Typography>
            <Typography variant="h5" className="text-gray-700">
              Ref: {product.reference}
            </Typography>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Counter
                quantity={quantity}
                onModifyQuantity={setQuantity}
                min={1}
                max={99}
                className="flex-1"
              />
              <Button
                variant="outlined"
                className="p-3 rounded-full bg-gray-100"
                onClick={handleShare}
              >
                <Share2 className="w-6 h-6 text-gray-600" />
              </Button>
            </div>

            <Button
              className="flex items-center justify-center gap-2 bg-[#FFCD00] text-white"
              size="lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>

          <Tabs value={activeTab} className="mt-6 z-0">
            <TabsHeader>
              <Tab
                value="description"
                onClick={() => setActiveTab("description")}
                className={activeTab === "description" ? "text-[#FFCD00]" : ""}
              >
                Descripción
              </Tab>
              <Tab
                value="specs"
                onClick={() => setActiveTab("specs")}
                className={activeTab === "specs" ? "text-[#FFCD00]" : ""}
              >
                Especificaciones
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="description">
                <Typography variant="h6" className="mb-4">
                  Sobre este producto
                </Typography>
                <Typography className="text-gray-600 mb-6">
                  {product.descripcion || "No hay descripción disponible"}
                </Typography>

                <Typography variant="h6" className="mb-3">
                  Características destacadas
                </Typography>
                <ul className="list-disc pl-5 space-y-2">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabPanel>

              <TabPanel value="specs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.Especificaciones?.fichatecnica && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="gray" className="mb-1">
                        Ficha Técnica
                      </Typography>
                      <Typography>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleOpenModal(
                              product.Especificaciones.fichatecnica
                            );
                          }}
                          className="text-blue-300"
                        >
                          Ver ficha técnica
                        </a>
                      </Typography>
                    </div>
                  )}

                  {product.Especificaciones &&
                    Object.entries(product.Especificaciones).map(
                      ([key, value]) => {
                        if (key === "fichatecnica") return null;

                        if (typeof value === "object" && value !== null) {
                          return (
                            <div
                              key={key}
                              className="bg-gray-50 p-4 rounded-lg"
                            >
                              <Typography
                                variant="small"
                                color="gray"
                                className="mb-1"
                              >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </Typography>
                              {Object.entries(value).map(
                                ([subKey, subValue]) => (
                                  <Typography key={subKey}>
                                    {subKey.charAt(0).toUpperCase() +
                                      subKey.slice(1)}
                                    : {subValue}
                                  </Typography>
                                )
                              )}
                            </div>
                          );
                        } else {
                          return (
                            <div
                              key={key}
                              className="bg-gray-50 p-4 rounded-lg"
                            >
                              <Typography
                                variant="small"
                                color="gray"
                                className="mb-1"
                              >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </Typography>
                              <Typography>{value}</Typography>
                            </div>
                          );
                        }
                      }
                    )}
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>

          {openModal && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
              <div className="bg-white shadow-2xl flex flex-col w-full max-w-6xl h-full max-h-[90vh] min-h-[300px]">
                <div className="flex justify-between items-center p-4 border-b">
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-700"
                  >
                    Ficha Técnica
                  </Typography>
                  <Button
                    onClick={handleCloseModal}
                    className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 transform transition-all duration-200"
                  >
                    ×
                  </Button>
                </div>

                <div className="flex-1 relative min-h-[200px] p-2">
                  <div className="absolute inset-2 bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      src={pdfUrl}
                      className="w-full h-full border-none"
                      title="Ficha técnica PDF"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="p-2 border-t bg-gray-50">
                  <Typography
                    variant="body2"
                    className="text-center text-gray-500"
                  >
                    Desplaza para ver el contenido completo del PDF
                  </Typography>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
{allyInfo && (
  <div className="mt-8 lg:flex lg:items-start lg:gap-8">
    <div className="lg:w-1/3 lg:flex lg:flex-col lg:items-start">
      <h2 className="text-lg font-medium mb-4 text-[#343434] lg:mb-0">
        Información del Aliado
      </h2>
      <div className="w-full max-w-xs mx-auto lg:mx-0 lg:mt-4">
        <AllyCard
          imageSrc={allyInfo.imageUrl} 
          description={allyInfo.description}
          link={allyInfo.allyLink}
          buttonLink={`/productos?marca=${allyInfo.name}`}
        />
      </div>
    </div>

    {isMessageAvailable && (
      <ToastMessage message="Producto agregado a la cotización" />
    )}

    <div className="lg:w-2/3 mt-8 lg:mt-0">
      <h2 className="text-lg font-medium mb-4 text-[#343434]">
        Más productos de {product.brand}
      </h2>
      <div className="lg:max-w-3xl">
        <ProductCarousel brand={product.brand} currentProductId={product._id} />
      </div>
    </div>
  </div>
)}
    </div>
  );
};
export default PDPPage;
