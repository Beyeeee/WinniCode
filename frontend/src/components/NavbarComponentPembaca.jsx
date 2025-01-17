import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBarComponentPembaca = () => {
  const [changeColor, setChangeColor] = useState(false); // State untuk background navbar
  const [sidebarShow, setSidebarShow] = useState(false); // State untuk sidebar
  const navigate = useNavigate();

  // Mengatur background navbar saat scroll
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
          {/* Hamburger Icon */}
          <button
            onClick={toggleSidebar}
            className="flex flex-col justify-center items-center space-y-1 focus:outline-none"
          >
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </button>

          {/* Search bar */}
          <form className="flex items-center mx-auto w-full max-w-lg">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
              </button>
            </div>
          </form>

          {/* Text Links */}
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

      {/* Sidebar (Offcanvas) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          sidebarShow ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
          <h2 className="font-bold text-lg">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 focus:outline-none"
          >
            ✖
          </button>
        </div>

        {/* Body Sidebar */}
        <div className="flex flex-col p-4 space-y-4">
          <NavLink
            to="/pembaca/home"
            className="text-gray-800 hover:text-blue-500 hover:underline"
          >
            HOME
          </NavLink>
          <NavLink
            to="/kategori"
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

      {/* Overlay untuk menutup sidebar */}
      {sidebarShow && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}

      {/* Padding untuk mencegah konten overlap */}
      <div style={{ paddingTop: "60px" }}>{/* Konten tambahan di sini */}</div>
    </div>
  );
};

export default NavBarComponentPembaca;
