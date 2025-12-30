import PDPPage from "@/components/products/pagePI";
import APIproducts from "@/services/products.services";

export async function generateMetadata({ params }) {
  const productId = params.pid;

  try {
    const product = await APIproducts.getProductById(productId);

    return {
      title: product?.name || "Equielect",
      description:
        product?.name ||
        "Somos un equipo con la capacidad de brindar soluciones prácticas y establecer alianzas duraderas.",
    };
  } catch (error) {
    console.error("Error obteniendo el producto:", error);
    return {
      title: "Error",
      description: "No se pudo cargar el producto.",
    };
  }
}

export default function Page() {
  return (
    <div>
      <PDPPage />
    </div>
  );
}
