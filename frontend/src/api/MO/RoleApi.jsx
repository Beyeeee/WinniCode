import urlAxios from "../.";

export const getRole = async () => {
  try {
    const response = await urlAxios.get("/role", {
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

export const delRole = async (id) => {
  try {
    const response = await urlAxios.delete(`/role/${id}`, {
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

export const editRole = async (id, newData) => {
  try {
    const response = await urlAxios.put(`/role/${id}`, newData, {
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

export const CreateRole = async (data) => {
  try {
    const response = await urlAxios.post("/role", data, {
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