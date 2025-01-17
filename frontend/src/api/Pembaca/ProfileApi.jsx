import urlAxios from "../.";

export const getProfile = async () => {
    try {
        const response = await urlAxios.get("/profile", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log("response : ");
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateGambar = async (data) => {
    try {
      const response = await urlAxios.post("/updateImage", data, {
        headers: {
          "Content-Type": "multipart/form-data", // untuk upload thumbnail
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};