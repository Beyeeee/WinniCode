import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { results = [], keyword = "" } = location.state || {}; 

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto py-8 px-4">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                        Hasil Pencarian
                    </h1>
                    {keyword && (
                        <p className="text-gray-600 text-center">
                            Kata kunci:{" "}
                            <span className="font-semibold text-blue-600">{keyword}</span>
                        </p>
                    )}
                </div>

                {/* Hasil Pencarian */}
                {results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((item) => (
                            <div
                                key={item.id_berita}
                                className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
                            >
                                {/* Thumbnail Placeholder */}
                                <div className="h-40 bg-gray-300 flex items-center justify-center">
                                    <img
                                        src={`http://127.0.0.1:8000/storage/gambar/${item.gambar_berita}`}
                                        alt={item.judul_berita}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.src = "/path/to/default-image.jpg"; 
                                        }}
                                    />
                                </div>
                                {/* Konten Berita */}
                                <div className="p-4">
                                    <h2 className="font-bold text-lg text-gray-800">
                                        {item.judul_berita}
                                    </h2>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {item.kategori?.nama_kategori || "Tanpa Kategori"}
                                    </p>
                                    <button
                                        className="mt-4 bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600"
                                        onClick={() =>
                                            navigate(`/h/berita/${item.id_berita}`, { state: { item } })
                                        }
                                    >
                                        Baca Selengkapnya
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-red-500 mt-8">
                        Tidak ada hasil yang ditemukan untuk kata kunci tersebut.
                    </p>
                )}

                {/* Tombol Kembali */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate("/pembaca/home")}
                        className="bg-gray-600 text-white text-sm px-6 py-2 rounded hover:bg-gray-700"
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
