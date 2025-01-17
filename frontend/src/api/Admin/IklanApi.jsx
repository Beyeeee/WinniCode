import urlAxios from "../.";

export const getIklan = async () => {
  try {
    const response = await urlAxios.get("/iklan", {
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

export const getRandomIklan = async () => {
  try {
    const response = await urlAxios.get("/iklanRandom", {
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

export const delIklan = async (id) => {
  try {
    const response = await urlAxios.delete(`/iklan/${id}`, {
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

export const editIklan = async (id, newData) => {
  try {
    const response = await urlAxios.put(`/iklan/${id}`, newData, {
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

export const createIklan = async (data) => {
  try {
    const response = await urlAxios.post("/iklan", data, {
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