const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_SERVER_URL || "http://localhost:3900/api";

const httpService = {
  async getPublicHttp(url, queryString = null) {
    try {
      const query = queryString ? `?${queryString}` : "";
      const response = await fetch(BASE_URL + url + query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error en getPublicHttp:", error.message);
      return { message: `Error: ${error.message}` };
    }
  },

  async getPrivateHttp(url, queryString = null) {
    try {
      const query = queryString ? `?${queryString}` : "";
      const response = await fetch(BASE_URL + url + query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error en getPrivateHttp:", error.message);
      return { message: `Error: ${error.message}` };
    }
  },
};

export default httpService;
