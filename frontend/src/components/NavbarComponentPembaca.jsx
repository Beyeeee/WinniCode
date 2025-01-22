import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { search } from "../api/Pembaca/BeritaApi";

const NavBarComponentPembaca = () => {
  const [changeColor, setChangeColor] = useState(false);
  const [sidebarShow, setSidebarShow] = useState(false); 
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const changeBackgroundColor = () => {
    if (window.scrollY > 10) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  useEffect(() => {
    changeBackgroundColor();
    window.addEventListener("scroll", changeBackgroundColor);
    return () => window.removeEventListener("scroll", changeBackgroundColor);
  }, []);

  const toggleSidebar = () => setSidebarShow(!sidebarShow);

  const handleSearch = async (e) => {
    e.preventDefault(); 
    try {
      const response = await search(keyword); 
      navigate("/search", {
        state: { results: response.data, keyword }, 
      });
    } catch (error) {
      console.error("Search failed:", error.message);
      alert("Pencarian gagal. Silakan coba lagi.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 ${
          changeColor ? "bg-gray-200 shadow-md" : "bg-white"
        } border-b border-gray-300`}
        style={{ height: "60px" }}
      >
        <div className="flex justify-between items-center px-4 h-full">
          <button
            onClick={toggleSidebar}
            className="flex flex-col justify-center items-center space-y-1 focus:outline-none"
          >
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </button>

          <form
            className="flex items-center mx-auto w-full max-w-lg"
            onSubmit={handleSearch}
          >
            <div className="relative w-full">
              <input
                type="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari berita..."
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                🔍
              </button>
            </div>
          </form>

          <div className="hidden lg:flex space-x-4">
            <a href="#" className="text-black font-bold">
              ABOUT US
            </a>
            <a href="#" className="text-black font-bold">
              CONTACT
            </a>
            <a href="#" className="text-black font-bold">
              SERVICE
            </a>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          sidebarShow ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
          <h2 className="font-bold text-lg">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 focus:outline-none"
          >
            ✖
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          <NavLink
            to="/pembaca/home"
            className="text-gray-800 hover:text-blue-500 hover:underline"
          >
            HOME
          </NavLink>
          <NavLink
            to="/h/kategori"
            className="text-gray-800 hover:text-blue-500 hover:underline"
          >
            KATEGORI
          </NavLink>
          <NavLink
            to="/pembaca/profile"
            className="text-gray-800 hover:text-blue-500 hover:underline"
          >
            PROFILE
          </NavLink>
          <button
            onClick={() => navigate("/login")}
            className="text-red-500 hover:text-red-600 hover:underline text-left"
          >
            LOGOUT
          </button>
        </div>
      </div>

      {sidebarShow && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}

      <div style={{ paddingTop: "60px" }}>{/* Konten tambahan di sini */}</div>
    </div>
  );
};

export default NavBarComponentPembaca;
