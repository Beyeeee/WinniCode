import urlAxios from "../.";

export const GetFavoritPembacabyLogin = async () => {
  try {
    const response = await urlAxios.get("/favorit", {
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

export const checkFavoritStatus = async (id) => {
  try {
    const response = await urlAxios.get(`/favorit/status/${id}`, {
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

export const saveFavorit = async (data) => {
  try {
    const response = await urlAxios.post(`/favorit`, data, {
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


export const delFavorit = async (id) => {
  try {
    const response = await urlAxios.delete(`/favorit/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log("response:", response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};