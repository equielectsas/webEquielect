import Image from "next/image";
import Link from "next/link";
import { Info, Truck, Store, Search, ShieldCheck, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const ProductItemPLP = ({ product }) => {
  const { 
    _id, 
    name = "Producto Técnico", 
    brand = "Equielect", 
    reference = "N/A",
    images = [], 
    stock = true 
  } = product || {};

  const productUrl = `/productos/${_id}`;

  return (
    <div className="group bg-white border border-gray-200 rounded-sm flex flex-col h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden">
      
      {/* --- BADGES INDUSTRIALES --- */}
      <div className="absolute top-3 left-0 z-10 flex flex-col items-start gap-1">
        {/* Referencia con fondo oscuro sólido */}
        <div className="bg-[#2d3748] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider shadow-sm">
          REF: {reference}
        </div>
        
        {/* Badge de Stock con estilo "Grey Label" para mayor sutileza */}
        {stock ? (
          <div className="bg-gray-100 text-gray-700 text-[9px] font-extrabold px-3 py-0.5 border-l-4 border-emerald-500 uppercase">
            Stock Disponible
          </div>
        ) : (
          <div className="bg-gray-50 text-gray-400 text-[9px] font-extrabold px-3 py-0.5 border-l-4 border-red-400 uppercase">
            Bajo Pedido
          </div>
        )}
      </div>

      {/* --- IMAGEN CON ENFOQUE EN CALIDAD --- */}
      <Link href={productUrl} className="relative block aspect-square w-full overflow-hidden p-8 border-b border-gray-100 bg-white">
        <Image
          src={images[0] || "/placeholder.png"}
          alt={`${name} - ${brand}`}
          fill
          className="object-contain transition-transform duration-700 ease-out group-hover:scale-105 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/5 transition-colors duration-300" />
      </Link>

      {/* --- CUERPO DE INFORMACIÓN TÉCNICA --- */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
          <p className="text-[12px] font-bold text-blue-600 uppercase tracking-widest mb-1.5 italic">
            {brand}
          </p>
          <h3 className="text-[15px] text-slate-800 font-bold line-clamp-2 h-11 leading-tight group-hover:text-blue-700 transition-colors">
            {name}
          </h3>
        </div>

        {/* Bloque de Confianza Industrial */}
        <div className="grid grid-cols-1 gap-2 mb-5">
          <div className="flex items-center gap-2.5 text-[11px] text-slate-500 font-medium bg-slate-50 p-2 rounded-sm">
            <ShieldCheck size={16} className="text-blue-600 shrink-0" />
            <span>Certificación de calidad garantizada</span>
          </div>
        </div>

        {/* Logística Profesional */}
        <div className="mt-auto space-y-2 pt-4 border-t border-gray-50">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2 text-slate-400">
              <Truck size={14} />
              <span>Despacho a nivel nacional</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Store size={14} />
            <span>Recogida en sede principal</span>
          </div>
        </div>

        {/* --- BOTÓN AZUL EQUIELECT --- */}
        <div className="mt-5">
          <Link href={productUrl}>
            <Button className="w-full bg-[#1c355e] hover:bg-[#1c355e] text-white text-[12px] font-bold py-4 rounded-none transition-all uppercase tracking-widest flex items-center justify-center gap-3 group/btn shadow-md active:translate-y-0.5">
              <span>Ver detalles</span>
              <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItemPLP;