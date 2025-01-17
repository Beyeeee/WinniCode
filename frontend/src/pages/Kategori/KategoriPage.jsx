import { useState, useEffect } from "react";
import { getKategori } from "../../api/Admin/KategoriApi";
import { useNavigate } from "react-router-dom";

const KategoriPage = () => {
  const [kategoriData, setKategoriData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  const fetchKategori = async () => {
    try {
      const response = await getKategori(); 
      setKategoriData(response.data);
      setLoading(false); 
    } catch (err) {
      console.error("Error fetching kategori:", err);
      setError("Gagal memuat data kategori");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKategori(); 
  }, []);

  const handleCategoryClick = (kategoriName) => {
    navigate(`/h/berita/kategori/${kategoriName}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Memuat kategori...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="flex flex-row justify-center">
        <a
          className="group flex items-center justify-between gap-5 w-10 rounded-lg mr-4 transition-colors focus:ring"
          href="/"
        >
          <span className="shrink-0 rounded-full flex items-center border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500">
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
        <h1 className="text-2xl font-bold text-gray-800 text-center mt-4 mb-8">
          Kategori Berita
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
        {kategoriData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(item.nama_kategori)} // Handle category click
            className="cursor-pointer flex items-center space-x-3 p-3 rounded-lg shadow-sm bg-white hover:bg-gray-100 transition"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-500`}
            >
              <span className="text-xl">{item.icon_kategori || "📁"}</span>
            </div>
            <p className="text-gray-700 font-medium">{item.nama_kategori}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KategoriPage;
