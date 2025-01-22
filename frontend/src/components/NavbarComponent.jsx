import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { search } from "../api/Pembaca/BeritaApi";
import tulisanWinniCode from "../assets/img/TulisanWinnicode.png";

const NavBarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);
  const [keyword, setKeyword] = useState(""); 
  const navigate = useNavigate();

  const handleLogoClick = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/pembaca/home");
    } else {
      navigate("/");
    }
  };

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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    try {
      const response = await search(keyword); 
      navigate("/search", { state: { results: response.data, keyword } }); 
    } catch (error) {
      console.error("Search failed:", error.message);
      alert("Pencarian gagal. Silakan coba lagi.");
    }
  };

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full z-50 ${
          changeColor ? "bg-gray-200 shadow-md" : "bg-white"
        } border-b border-gray-300`}
        style={{ height: "60px" }}
      >
        <div className="flex justify-between pb-2 items-center px-4 h-full">
          {/* Logo di pojok kiri */}
          <div className="flex items-center space-x-4">
            <img
              src={tulisanWinniCode}
              alt="WinniCode"
              className="h-8 cursor-pointer"
              onClick={handleLogoClick}
            />
          </div>

          {/* Search bar */}
          <form className="flex items-center mx-auto w-full max-w-lg" onSubmit={handleSearch}>
            <div className="relative w-full">
              <input
                type="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search"
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

          {/* Text Links */}
          <div className="hidden lg:flex space-x-4">
            <Nav>
              <NavLink className="nav-link font-bold text-black" to="/h/kategori">
                KATEGORI
              </NavLink>
              <NavLink className="nav-link font-bold text-black" to="/pembaca/profile">
                PROFILE
              </NavLink>
            </Nav>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBarComponent;
