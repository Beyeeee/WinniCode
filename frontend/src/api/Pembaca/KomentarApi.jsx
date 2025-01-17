import urlAxios from "../.";

export const getKomentar= async (id) => {
  try {
      const response = await urlAxios.get(`/komentar/${id}`, {
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
export const createKomentar = async (id, data) => {
  try {
    const response = await urlAxios.post(`/berita/${id}/komentar`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saat mengirim komentar:", error.response?.data || error.message);
    throw error.response?.data || { message: "Terjadi kesalahan saat mengirim komentar" };
  }
};
