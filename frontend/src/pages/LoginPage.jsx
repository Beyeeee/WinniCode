import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

// Schema Validasi
const schema = yup.object().shape({
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup.string().min(6, "Password minimal 6 karakter").required("Password wajib diisi"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", data);
      console.log("Response:", response);  // Periksa response untuk memverifikasi status active

      // Cek jika akun belum aktif (active = null)
      if (response.data.user?.active === null) {
        setApiError("Akun Anda belum aktif. Silakan periksa email Anda untuk verifikasi.");
      } else if (response.data.user?.active === 1) {
        console.log("Access token (before save):", response.data.access_token);
        // Jika akun aktif, simpan token dan arahkan ke halaman sesuai role
        sessionStorage.setItem("token", response.data.access_token);
        console.log(response.access_token);

        const { id_role } = response.data.user;
        if (id_role === 1) {
          navigate("/admin");
        } else if (id_role === 2) {
          navigate("/pembaca/home");
        } else if (id_role === 3){
          navigate("/mo")
        } else {
          navigate("/default-page");
        }
      } else {
        setApiError(response.data.message || "Login gagal");
      }
    } catch (error) {
      setApiError("Terjadi kesalahan. Periksa email dan password Anda.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="bg-pink-400 min-h-screen flex justify-center items-center">
      <div className="bg-white w-[60rem] h-[35rem] shadow-x2 flex">
        {/* Bagian Kiri */}
        <div className="w-[60%] bg-sky-200">
          <a
            className="group flex items-center justify-between gap-5 w-20 rounded-lg border px-3 py-3 transition-colors focus:ring"
            href="/"
          >
            <span
              className="shrink-0 rounded-full flex items-center border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500"
            >
              <svg
                className="size-5 rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
        </div>

        {/* Bagian Kanan */}
        <div className="flex w-[40%] flex-col">
          <div className="flex w-full justify-center h-[8rem]">
            <img src={logo} alt="logo" className="w-16 object-contain" />
          </div>
          <h1 className="font-bold font-mono text-3xl flex justify-center">Selamat Datang</h1>
          <h2 className="font-bold font-mono text-l flex justify-center pb-4">Di WinniCode Garuda</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
            <div className="flex w-72 flex-col gap-6">
              {/* Input Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-blue-600 focus:outline-none"
                />
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              </div>

              {/* Input Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:border-blue-600 focus:outline-none"
                />
                <p className="text-red-500 text-sm">{errors.password?.message}</p>
              </div>

              {/* Error API */}
              {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}

              {/* Tombol Login */}
              <button
                type="submit"
                className="w-full rounded-lg bg-pink-400 px-4 py-2 text-white font-medium hover:bg-pink-500"
              >
                Login
              </button>

              {/* Link Register */}
              <a href="/register" className="flex justify-center text-sm text-blue-600 hover:text-pink-300 font-thin">
                Register Now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
