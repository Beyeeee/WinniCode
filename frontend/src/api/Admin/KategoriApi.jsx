import urlAxios from "../.";

export const getKategori = async () => {
  try {
    const response = await urlAxios.get("/kategori", {
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

export const delKategori = async (id) => {
  try {
    const response = await urlAxios.delete(`/kategori/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log("response : ", response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const editKategori = async (id, newData) => {
  try {
    const response = await urlAxios.put(`/kategori/${id}`, newData, {
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

export const createKategori = async (data) => {
  try {
    const response = await urlAxios.post("/kategori", data, {
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