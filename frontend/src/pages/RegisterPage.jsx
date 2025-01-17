import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

// Schema Validasi menggunakan Yup
const schema = yup.object().shape({
    nama_lengkap: yup.string().required("Nama Lengkap wajib diisi"),
    email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
    username: yup.string().min(4, "Usename minimal 4 karakter").required("Username wajib diisi"),
    password: yup.string().min(6, "Password minimal 6 karakter").required("Password wajib diisi"),
    tanggal_lahir: yup.date().required("Tanggal Lahir wajib diisi"),
    no_telp: yup.string().matches(/^\d{10,12}$/, "Nomor Telepon tidak valid").required("Nomor Telepon wajib diisi"),
});


// const formatDate = (date) => {
//     const d = new Date(date);
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, '0');
//     const day = String(d.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
// };

const RegisterPage = () => {
    const navigate = useNavigate();
    const [apiError, setApiError] = useState(null); // Untuk menangkap error dari API

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    const onSubmit = async (data) => {
        const formattedTanggalLahir = formatDate(data.tanggal_lahir);
        data.tanggal_lahir = formattedTanggalLahir; // Ganti nilai tanggal_lahir
    
        try {
            const response = await axios.post("http://localhost:8000/api/register", data);
            if (response.status === 200) {
                navigate("/login");
            } else {
                setApiError(response.data.message || "Registrasi gagal");
            }
        } catch (error) {
            console.error("Registration Error:", error);
            setApiError("Terjadi kesalahan. Periksa kembali data Anda.");
        }
    };

    return (
        <div className="bg-pink-400 h-[100vh] flex justify-center items-center">
            <div className="bg-white w-[60rem] h-[37rem] shadow-x2 flex">
                <div className="bg-sky-200 w-[60%]">
                    <a
                        className="group flex items-center justify-between gap-5 w-20 rounded-lg border px-3 py-3 transition-colors focus:ring"
                        href="/login"
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
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </span>
                    </a>
                </div>
                <div className="flex w-[40%] flex-col">
                    <div className="flex w-full justify-center h-[5rem]">
                        <img src={logo} alt="logo" className="w-16 object-contain" />
                    </div>
                    <h1 className="flex font-bold font-mono text-3xl py-2 justify-center">Register</h1>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
                            <div className="flex flex-col py-2 pb-5">
                                {/* Input Nama Lengkap */}
                                <div className="flex pb-2">
                                    <label
                                        htmlFor="nama_lengkap"
                                        className="relative block overflow-hidden border-b w-72 border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                                    >
                                        <input
                                            {...register("nama_lengkap")}
                                            id="nama_lengkap"
                                            placeholder="Nama Lengkap"
                                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                        />
                                        <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                                            Nama Lengkap
                                        </span>
                                    </label>
                                    <p className="text-red-500 text-sm">{errors.namaLengkap?.message}</p>
                                </div>

                                {/* Input Email */}
                                <div className="flex pb-2">
                                    <label
                                        htmlFor="email"
                                        className="relative block overflow-hidden border-b w-72 border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                                    >
                                        <input
                                            {...register("email")}
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                        />
                                        <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                                            Email
                                        </span>
                                    </label>
                                    <p className="text-red-500 text-sm">{errors.email?.message}</p>
                                </div>

                                {/* Input Username */}
                                <div className="flex pb-2">
                                    <label
                                        htmlFor="username"
                                        className="relative block overflow-hidden border-b w-72 border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                                    >
                                        <input
                                            {...register("username")}
                                            id="username"
                                            placeholder="Username"
                                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                        />
                                        <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                                            Username
                                        </span>
                                    </label>
                                    <p className="text-red-500 text-sm">{errors.username?.message}</p>
                                </div>

                                {/* Input Password */}
                                <div className="flex pb-2">
                                    <label
                                        htmlFor="password"
                                        className="relative block overflow-hidden border-b w-72 border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                                    >
                                        <input
                                            {...register("password")}
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                        />
                                        <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                                            Password
                                        </span>
                                    </label>
                                    <p className="text-red-500 text-sm">{errors.password?.message}</p>
                                </div>

                                {/* Input Tanggal Lahir */}
                                <div className="flex pb-2">
                                    <label
                                        htmlFor="tanggal_lahir"
                                        className="relative block overflow-hidden border-b w-72 border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                                    >
                                        <input
                                            {...register("tanggal_lahir")}
                                            id="tanggalLahir"
                                            type="date"
                                            placeholder="Tanggal Lahir"
                                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                        />
                                        <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                                            Tanggal Lahir
                                        </span>
                                    </label>
                                    <p className="text-red-500 text-sm">{errors.tanggalLahir?.message}</p>
                                </div>

                                {/* Input Nomor Telepon */}
                                <div className="flex pb-2">
                                    <label
                                        htmlFor="no_telp"
                                        className="relative block overflow-hidden border-b w-72 border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                                    >
                                        <input
                                            {...register("no_telp")}
                                            id="noTelp"
                                            type="tel"
                                            placeholder="Nomor Telepon"
                                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                        />
                                        <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                                            Nomor Telepon
                                        </span>
                                    </label>
                                    <p className="text-red-500 text-sm">{errors.noTelp?.message}</p>
                                </div>

                                {/* Error API */}
                                {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}

                                {/* Tombol Register */}
                                <div className="flex justify-center pt-3">
                                    <button
                                        type="submit"
                                        className="w-32 rounded-xl bg-pink-400 px-6 pt-2 py-3 text-white font-medium hover:bg-pink-500"
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
