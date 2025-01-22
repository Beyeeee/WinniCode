import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getByKategori } from "../../api/Pembaca/BeritaApi";

const ShowBeritaPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [beritaData, setBeritaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await getByKategori(category); // Panggil API berdasarkan kategori
        setBeritaData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching berita:", err);
        setError("Gagal memuat data berita");
        setLoading(false);
      }
    };

    fetchBerita();
  }, [category]);

  const handleBackClick = () => {
    navigate("/h/kategori"); // Navigasi ke halaman kategori
  };

  const handleBeritaClick = (id) => {
    navigate(`/berita/${id}`); // Navigasi ke halaman BeritaPage dengan ID berita
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <p className="text-gray-500">Memuat berita...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 pt-20">
      {/* Tombol Kembali */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleBackClick}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Kembali ke Kategori
        </button>
      </div>

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Berita {category}
      </h1>

      {/* Daftar Berita */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {beritaData.length > 0 ? (
          beritaData.map((item) => (
            <div
              key={item.id_berita} // Gunakan ID berita sebagai key
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
              onClick={() => handleBeritaClick(item.id_berita)} // Navigasi ke halaman detail berita
            >
              {/* Gambar Berita */}
              <img
                src={`http://127.0.0.1:8000/storage/gambar/${item.gambar_berita}`}
                alt={item.judul_berita}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = "/path/to/default-image.jpg"; // Ganti dengan gambar default jika gambar gagal dimuat
                }}
              />
              {/* Konten Berita */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.judul_berita}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {item.isi_berita.slice(0, 100)}...
                </p>
                <span className="text-xs text-gray-500">
                  {new Date(item.tanggal_berita).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            Tidak ada berita untuk kategori ini.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShowBeritaPage;
