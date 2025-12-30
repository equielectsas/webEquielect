"use client";
import { useEffect, useState } from "react";
import AllyCard from "@/components/ui/AllyCard";

const AlliesPage = () => {
  const [allies, setAllies] = useState([]);

  useEffect(() => {
    const fetchAllies = async () => {
      try {
        const response = await fetch("http://localhost:3900/api/aliados");
        if (!response.ok) {
          throw new Error("Error al obtener los aliados");
        }
        const data = await response.json();
        setAllies(data);
      } catch (error) {
        console.error("Error fetching allies:", error);
      }
    };

    fetchAllies();
  }, []);

  return (
    <div className="p-[16px] bg-white taxt-black text-center lg:max-w-[1250px] m-auto lg:p-[20px]">
      <div className="flex flex-wrap justify-left m-[16px] text-left">
        <h2 className="text-left text-lg font-medium mb-4 text-[#343434]">
          Nuestros aliados
        </h2>

        <p className="text-[#343434] mb-2">
          En Equielect, nuestros aliados representan la innovación,
          confiabilidad y el futuro de las soluciones eléctricas. Con ellos,
          brindamos productos y servicios de alta calidad para impulsar la
          transformación digital y la eficiencia en los sectores industriales.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {allies.map((ally) => (
          <AllyCard
            key={ally._id}
            imageSrc={ally.imageUrl}
            description={ally.description}
            link={ally.allyLink}
            buttonLink={`/productos?marca=${ally.name}`}
          />
        ))}
      </div>
    </div>
  );
}; 

export default AlliesPage;