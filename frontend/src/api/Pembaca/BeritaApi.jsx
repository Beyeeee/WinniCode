import urlAxios from "../.";

export const createBerita = async (data) => {
    try {
      const response = await urlAxios.post("/berita", data, {
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

export const getByKategori = async (category) => {
    try {
        const response = await urlAxios.get(`/berita/kategori/${category}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const getBerita = async () => {
    try {
        const response = await urlAxios.get("/berita", {
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

export const search = async (keyword) => {
    try {
      const response = await urlAxios.get("/searchBerita", {
        params: { keyword },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  

export const getTrendingBerita = async () => {
    try {
        const response = await urlAxios.get("/beritaTrending", {
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

export const getBeritaTerkini = async () => {
    try {
        const response = await urlAxios.get("/beritaTerkini", {
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

export const showBerita = async (id) => {
    try {
        const response = await urlAxios.get(`/berita/${id}`, {
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

export const delBerita = async (id) => {
    try {
        const response = await urlAxios.delete(`/berita/${id}`, {
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

export const editBerita = async (id, newData) => {
    try {
        const response = await urlAxios.put(`/berita/${id}`, newData, {
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

