import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Layout
import Layout from "../Layout/Layout";
import LayoutGuest from "../Layout/LayoutGuest";
import LayoutPembaca from "../Layout/LayoutPembaca";
import LayoutAdmin from "../Layout/LayoutAdmin";

// Pages
import FavoritPage from "../pages/Pembaca/FavoritPage";
import ProfilePage from "../pages/Pembaca/ProfilePage";
import AdminHomePage from "../pages/Admin/AdminHomePage"
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import HomePageGuest from "../pages/HomePageGuest";
import DataBeritaPage from "../pages/Admin/Berita/DataBeritaPage"
import DataKategoriPage from "../pages/Admin/Kategori/DataKategoriPage"
import IklanPage from "../pages/Admin/Iklan/DataIklanPage"
import BeritaPage from "../pages/BeritaPage";
import KategoriPage from "../pages/Kategori/KategoriPage";

import ShowBeritaPage from "../pages/Kategori/ShowBeritaPage";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/kategori",
        element: <KategoriPage/>
    },
    {
        path: "/h",
        element: <Layout/>,
        children: [
            {
                path: "/h/berita/kategori/:category",
                element: <ShowBeritaPage/>
            },
            {
                path: "/h/berita/:id_berita",
                element: <BeritaPage/>
            },
        ],
    },
    {
        path: "/",
        element: <LayoutGuest />,
        children: [
            {
                path: "/", // path kosong untuk halaman utama
                element: <HomePageGuest />
            },
        ],
    },
    {
        path: "/pembaca",
        element: <LayoutPembaca />,
        children: [
            {
                path: "/pembaca/home", 
                element: <HomePageGuest />
            },
            {
                path: "/pembaca/profile", 
                element: <ProfilePage />
            },
            {
                path: "/pembaca/favorit", 
                element: <FavoritPage />
            },
        ],
    },
    {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
            {
                path: "/admin",
                element: <AdminHomePage />
            },
            {
                path: "/admin/berita",
                element: <DataBeritaPage/>
            },
            {
                path: "/admin/kategori",
                element: <DataKategoriPage/>
            },
            {
                path: "/admin/iklan",
                element: <IklanPage/>
            },
        ]
    },
    {
        path: "*",
        element: <div>Routes Not Found!</div>
    }
]);

const AppRouter = () => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <RouterProvider router={router} />
        </>
    );
};

export default AppRouter;
