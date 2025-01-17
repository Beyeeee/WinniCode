import urlAxios from ".";

export const Login = async (data) => {
  try {
    const response = await urlAxios.post("/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);
    if (response.status === 200) {
      console.log("Access token (before save):", response.data.access_token);
      sessionStorage.setItem("token", response.data.access_token);
      console.log("Token stored in sessionStorage:", sessionStorage.getItem("token"));
    } else {
      console.error("Login failed, status:", response.status);
    }

    return response.data;
  } catch (error) {
    console.error("Error : ", error);
    throw error.response.data;
  }
};

export const RegisterUser = async (data) => {
  //data diisi dengan maping atau object dasar
  try {
    console.log("di Auth 1 masuk");
    //error disini dia tidak mau
    const response = await urlAxios.post("/register", data);
    //-----------------------
    console.log("di Auth 2 masuk");
    console.log("Response:", response);
    console.log("di Auth 3 masuk");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};