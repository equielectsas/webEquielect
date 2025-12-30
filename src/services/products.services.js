import httpService from "./http.services";

class APIProducts {
  constructor() {}

  async getAllProducts(queryString) {
    try {
      const response = await httpService.getPublicHttp(
        `/api/productos?${queryString}`
      );
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Error en getAllProducts:", error);
      return [];
    }
  }

  async getProductById(pid) {
    try {
      const response = await httpService.getPublicHttp(`/api/productos/${pid}`);
      return response;
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      return { message: "Producto no encontrado" };
    }
  }
}

export default new APIProducts();
