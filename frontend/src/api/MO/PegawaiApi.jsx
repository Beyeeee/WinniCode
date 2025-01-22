import urlAxios from "../.";

export const getPegawai = async () => {
    try {
        const response = await urlAxios.get("/pegawai", {
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

export const editRolePegawai = async (id, newData) => {
    try {
        const response = await urlAxios.put(`/pegawai/${id}`, newData, {
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

export const delPegawai = async (id) => {
    try {
        const response = await urlAxios.delete(`/pegawai/${id}`, {
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
