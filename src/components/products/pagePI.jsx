"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  FileText,
  ZoomIn,
  ShieldCheck,
  CheckCircle2,
  X,
  Truck,
  Store,
  ShoppingCart,
  Award,
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
import ToastMessage from "@/components/utils/Toastify/ToastMessage";
import ProductCarousel from "@/components/products/ProductCarousel";

const PDPPage = () => {
  const { pid } = useParams();

  const [product, setProduct] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [isMessageAvailable, setIsMessageAvailable] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = React.useState("description");
  const [openModal, setOpenModal] = React.useState(false);
  const [allyInfo, setAllyInfo] = React.useState(null);

  // --- LÓGICA DE DATOS ---
  const fetchAllyByBrand = async (brand) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/aliados?brand=${brand}`,
      );
      if (!response.ok) throw new Error("Error al obtener el aliado");
      const data = await response.json();
      if (data.length > 0) setAllyInfo(data[0]);
    } catch (error) {
      console.error("Error fetching ally:", error);
    }
  };

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await APIproducts.getProductById(pid);
        if (!data) throw new Error("Producto no encontrado");
        setProduct(data);
        if (data.brand) await fetchAllyByBrand(data.brand.toLowerCase());
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (pid) fetchProduct();
  }, [pid]);

  // --- HANDLERS ---
  const handleMouseMove = (e) => {
    if (isZoomed) {
      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = ((e.pageX - left) / width) * 100;
      const y = ((e.pageY - top) / height) * 100;
      setMousePosition({ x, y });
    }
  };

  // ✅ AHORA SÍ AGREGA A LA LISTA DE COTIZACIÓN
  const handleAddToCart = () => {
    if (!product) return;

    // id único: usa _id si existe, si no pid, si no reference
    const id = product._id || pid || product.reference || product.name;

    addItem({
      id,
      title: product.name || "Producto",
      code: product.reference || product.codigo || "",
      brand: product.brand || "",
      qty: quantity, // 👈 respetar cantidad seleccionada
    });

    // ✅ abrir sidebar al agregar (si tienes el listener en QuoteWidget)
    window.dispatchEvent(new CustomEvent("open-quote-drawer"));

    // ✅ tu toast
    setIsMessageAvailable(true);
    setTimeout(() => setIsMessageAvailable(false), 3000);
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

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#0056b3]"></div>
        <Typography className="font-bold text-slate-400 uppercase tracking-widest text-xs">
          Cargando Especificaciones...
        </Typography>
      </div>
    );

  if (error || !product)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <Typography
            variant="h5"
            color="red"
            className="mb-2 text-sm font-bold uppercase"
          >
            Error de Sistema
          </Typography>
          <Typography className="text-gray-600">
            {error || "Producto no localizado"}
          </Typography>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* COLUMNA IZQUIERDA: GALERÍA CON MINIATURAS VERTICALES A LA IZQUIERDA */}
        <div className="flex gap-4">
          {/* Listado Vertical de Miniaturas */}
          <div className="flex flex-col gap-3 shrink-0">
            {(product.images || []).map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-20 h-20 border-2 transition-all ${
                  currentImageIndex === index
                    ? "border-[#0056b3] shadow-sm"
                    : "border-gray-100 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={image}
                  className="w-full h-full object-contain p-2"
                  alt="thumb"
                />
              </button>
            ))}
          </div>

          {/* Imagen Grande Principal */}
          <div className="relative flex-1 aspect-square overflow-hidden border border-gray-100 bg-white cursor-zoom-in shadow-sm">
            <div
              className={`relative w-full h-full transition-transform duration-500 ease-out ${
                isZoomed ? "scale-[2.5]" : "scale-100"
              }`}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              style={{
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
              }}
            >
              <img
                src={(product.images || [])[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-contain p-10 mix-blend-multiply"
              />
            </div>

            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? (product.images || []).length - 1 : prev - 1,
                  );
                }}
                className="p-2 rounded-full bg-white shadow-md pointer-events-auto hover:bg-[#0056b3] hover:text-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImageIndex((prev) =>
                    prev === (product.images || []).length - 1 ? 0 : prev + 1,
                  );
                }}
                className="p-2 rounded-full bg-white shadow-md pointer-events-auto hover:bg-[#0056b3] hover:text-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {isZoomed && (
              <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-sm">
                <ZoomIn className="w-5 h-5 text-blue-600" />
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: INFO COMPRA */}
        <div className="flex flex-col">
          <div className="border-b border-gray-100 pb-6 mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Marca:
              </span>

              <span className="inline-flex items-center px-2.5 py-1 border border-slate-200 bg-white text-[#0056b3] text-[11px] font-bold">
                {product.brand}
              </span>

              <span className="text-slate-300 text-xs">|</span>

              <span className="text-slate-500 text-[11px] font-bold uppercase tracking-tighter">
                Ref: {product.reference}
              </span>
            </div>

            <Typography
              variant="h2"
              className="text-3xl font-black text-slate-900 leading-tight mb-4 uppercase"
            >
              {product.name}
            </Typography>

            <div className="flex items-center gap-3 text-emerald-600">
              <CheckCircle2 size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Equipo certificado en stock
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-2 p-4 bg-slate-50 border border-slate-100">
              <Typography className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                Cantidad a cotizar
              </Typography>
              <div className="flex items-center gap-4">
                <Counter
                  quantity={quantity}
                  onModifyQuantity={setQuantity}
                  min={1}
                  max={99}
                  className="bg-white border-gray-200"
                />
                <Button
                  onClick={handleShare}
                  variant="text"
                  className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors p-2"
                >
                  <Share2 size={20} />
                </Button>
              </div>
            </div>

            <Button
              className="w-full bg-[#1c355e] hover:bg-black text-white py-5 rounded-none flex items-center justify-center gap-3 text-xs font-black tracking-[0.2em] shadow-md transition-all"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
              AGREGAR A COTIZACIÓN
            </Button>

            <div className="flex items-center justify-between py-4 px-2 border-t border-gray-100">
              {[
                { icon: <ShieldCheck size={35} />, label: "Garantía" },
                { icon: <Truck size={35} />, label: "Envío Nacional" },
                { icon: <Store size={35} />, label: "Punto de Venta" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-all cursor-default"
                >
                  {item.icon}
                  <span className="text-[9px] font-bold uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TABS DE ESPECIFICACIONES */}
      <div className="mt-10">
        <Tabs value={activeTab}>
          <TabsHeader className="bg-transparent border-b border-gray-200 rounded-none p-0 gap-8">
            {["description", "specs"].map((tab) => (
              <Tab
                key={tab}
                value={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-max py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === tab
                    ? "text-[#0056b3] border-b-2 border-[#1c355e]"
                    : "text-gray-400"
                }`}
              >
                {tab === "description" ? "Descripción" : "Ficha Técnica"}
              </Tab>
            ))}
          </TabsHeader>

          <TabsBody>
            <TabPanel value="description" className="py-8 px-0">
              <div className="max-w-4xl">
                <Typography className="text-slate-600 leading-relaxed mb-8 text-lg font-light">
                  {product.descripcion ||
                    "Consulte con nuestros asesores las bondades de este equipo."}
                </Typography>

                <Typography
                  variant="h6"
                  className="text-slate-900 font-black mb-4 uppercase text-xs tracking-widest"
                >
                  Características del Equipo
                </Typography>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12">
                  {product.features?.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-600 text-sm"
                    >
                      <CheckCircle2
                        size={14}
                        className="text-blue-600 mt-1 shrink-0"
                      />{" "}
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </TabPanel>

            <TabPanel value="specs" className="py-8 px-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {product.Especificaciones?.fichatecnica && (
                  <div className="lg:col-span-3">
                    <button
                      onClick={() => setOpenModal(true)}
                      className="flex items-center gap-4 p-5 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors w-full md:w-max"
                    >
                      <FileText size={26} className="text-blue-600" />
                      <div className="text-left">
                        <Typography className="font-black text-blue-900 text-[10px] uppercase tracking-widest">
                          Documento Técnico
                        </Typography>
                        <Typography className="text-blue-700 text-xs font-bold">
                          Abrir Visor PDF
                        </Typography>
                      </div>
                    </button>
                  </div>
                )}

                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
                  {product.Especificaciones &&
                    Object.entries(product.Especificaciones).map(
                      ([key, value]) => {
                        if (key === "fichatecnica") return null;
                        return (
                          <div key={key} className="p-5 bg-white">
                            <Typography className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
                              {key}
                            </Typography>
                            <Typography className="text-slate-800 font-bold text-sm">
                              {typeof value === "object" ? "Ver Manual" : value}
                            </Typography>
                          </div>
                        );
                      },
                    )}
                </div>
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>

      {/* ✅ SECCIÓN MARCA - LOGOS MÁS GRANDES */}
      {allyInfo && (
        <div className="mt-12 pt-10 border-t border-slate-100">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div className="space-y-2">
              <Typography className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] flex items-center gap-2">
                <Award size={14} /> Respaldo de Fábrica
              </Typography>

              <Typography
                variant="h3"
                className="text-2xl font-black text-slate-900 uppercase"
              >
                Ecosistema{" "}
                <span className="text-blue-600">{product.brand}</span>
              </Typography>
            </div>

            <div className="hidden md:flex items-center gap-4 px-4 py-3 bg-white border border-slate-200">
              <img
                src={allyInfo.imageUrl}
                alt={product.brand}
                className="h-10 w-auto object-contain opacity-100"
              />
              <div className="h-6 w-[1px] bg-slate-200" />
              <Typography className="text-[9px] font-bold text-slate-500 uppercase leading-none">
                Distribuidor autorizado de <br />
                <span className="text-slate-900">{product.brand}</span>
              </Typography>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <div className="sticky top-24 p-6 bg-white border border-slate-200 shadow-sm">
                <Typography className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Marca
                </Typography>

                <img
                  src={allyInfo.imageUrl}
                  className="w-40 mb-5 object-contain mix-blend-multiply"
                  alt="Brand Logo"
                />

                <Typography className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                  {allyInfo.description ||
                    `Conoce productos y soluciones de ${product.brand}.`}
                </Typography>

                <Button
                  variant="outlined"
                  size="sm"
                  fullWidth
                  className="rounded-none border-slate-300 text-slate-900 font-black text-[10px] tracking-widest hover:bg-slate-900 hover:text-white transition-all py-3"
                  onClick={() =>
                    (window.location.href = `/productos?marca=${product.brand}`)
                  }
                >
                  VER CATÁLOGO DE {product.brand}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-9 bg-white p-4 md:p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-4 w-[3px] bg-blue-600" />
                <Typography className="text-[11px] font-black text-slate-900 uppercase tracking-widest">
                  Productos relacionados por marca
                </Typography>
              </div>

              <div className="overflow-hidden">
                <ProductCarousel
                  brand={product.brand}
                  currentProductId={product._id}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PDF */}
      {openModal && (
        <div className="fixed inset-0 bg-slate-900/95 flex justify-center items-center z-[100] p-4">
          <div className="bg-white w-full max-w-5xl h-[90vh] flex flex-col relative shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Visor de Documentación Equielect
              </span>
              <button
                onClick={() => setOpenModal(false)}
                className="text-slate-900 hover:rotate-90 transition-transform"
              >
                <X size={24} />
              </button>
            </div>
            <iframe
              src={product.Especificaciones?.fichatecnica}
              className="flex-1 w-full border-none"
            />
          </div>
        </div>
      )}

      {isMessageAvailable && (
        <ToastMessage message="Añadido a la lista de cotización" />
      )}
    </div>
  );
};

export default PDPPage;
