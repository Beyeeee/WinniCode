import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showBerita } from "../api/Pembaca/BeritaApi";
import { saveFavorit, delFavorit, checkFavoritStatus } from "../api/Pembaca/FavoritApi"; 
import { createKomentar, getKomentar } from "../api/Pembaca/KomentarApi";
import IklanComponent from "../components/IklanComponent";
import ModalLogin from "./ModalLogin";

const BeritaPage = () => {
    const { id_berita } = useParams();
    const navigate = useNavigate();
    const [berita, setBerita] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [komentar, setKomentar] = useState([]);
    const [loadingKomentar, setLoadingKomentar] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false); 
    const [isFavorit, setIsFavorit] = useState(false); // State untuk status favorit

    // Fungsi untuk memeriksa status favorit
    const checkFavorit = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            try {
                const favoritStatusResponse = await checkFavoritStatus(id_berita);
                if (favoritStatusResponse?.data) {
                    setIsFavorit(favoritStatusResponse.data.isFavorit); // Mengupdate status favorit
                }
            } catch (error) {
                console.error("Gagal memeriksa status favorit:", error);
            }
        }
    };

    useEffect(() => {
        const fetchBerita = async () => {
            try {
                const beritaResponse = await showBerita(id_berita);
                setBerita(beritaResponse.data);
                const komentarResponse = await getKomentar(id_berita);
                setKomentar(komentarResponse.data || []);
                checkFavorit(); // Cek status favorit setiap kali berita dimuat
            } catch (err) {
                console.error("Error fetching berita/komentar:", err);
                setError("Berita tidak ditemukan");
            } finally {
                setLoading(false);
            }
        };

        if (id_berita) fetchBerita();
    }, [id_berita]); // Memastikan efek ini dijalankan setiap kali id_berita berubah

    // Fungsi untuk menambahkan atau menghapus favorit
    const handleToggleFavorit = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            setShowLoginModal(true);
            return;
        }

        const body = { id_berita }; // Menambahkan id_berita dalam request body
        console.log(body)
        try {
            if (isFavorit) {
                
                await delFavorit(id_berita); 
                setIsFavorit(false); // Update state setelah menghapus dari favorit
                alert("Berita telah dihapus dari favorit.");
            } else {
                // Tambahkan ke favorit
                await saveFavorit({ id_berita }); // Kirimkan id_berita dalam objek
                setIsFavorit(true); // Update state setelah menambahkan ke favorit
                alert("Berita berhasil ditambahkan ke favorit!");
            }
        } catch (err) {
            console.error("Error mengubah status favorit:", err.message || err);
            alert(err.message || "Terjadi kesalahan. Silakan coba lagi.");
        }
    };

    // Fungsi untuk mengirim komentar
    const handleKomentarSubmit = async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem("token");
        if (!token) {
            setShowLoginModal(true);
            return;
        }

        const newKomentar = e.target.komentar.value.trim();

        if (newKomentar) {
            setLoadingKomentar(true);
            try {
                const data = { isi_komentar: newKomentar };
                const response = await createKomentar(id_berita, data);
                setKomentar((prevKomentar) => [...prevKomentar, response]);
                e.target.komentar.value = "";
            } catch (err) {
                console.error("Gagal mengirim komentar:", err.message || err);
                alert("Gagal mengirim komentar. Silakan coba lagi.");
            } finally {
                setLoadingKomentar(false);
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error || !berita) {
        return <p>{error || "Berita tidak ditemukan"}</p>;
    }

    return (
        <div className="flex min-h-screen flex-row mt-4 bg-gray-50">
            {/* Iklan di sisi kiri */}
            <IklanComponent />

            {/* Konten Utama */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {berita.judul_berita}
                    </h2>
                    <img
                        src={`http://127.0.0.1:8000/storage/gambar/${berita.gambar_berita}`}
                        alt={berita.judul_berita}
                        className="w-full h-72 object-cover rounded-lg mb-6"
                    />
                    <div className="flex items-center justify-between text-gray-600 text-sm mb-6">
                        <span>
                            Penulis: <strong>{berita.nama_penulis || "Tidak diketahui"}</strong>
                        </span>
                        <span>Tanggal: <strong>{berita.tanggal_berita}</strong></span>
                    </div>
                    <div className="text-gray-700 leading-relaxed mb-4">
                        {berita.isi_berita.split("\n").map((paragraf, index) => (
                            <p key={index} className="mb-4">
                                {paragraf}
                            </p>
                        ))}
                    </div>
                    <button
                        onClick={handleToggleFavorit}
                        className={`px-4 py-2 rounded-lg ${
                            isFavorit
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                    >
                        {isFavorit ? "Hapus dari Favorit" : "Tambahkan ke Favorit"}
                    </button>
                </div>

                {/* Bagian Komentar */}
                <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Komentar</h3>
                    <ul className="space-y-4 mb-6">
                        {komentar.length > 0 ? (
                            komentar.map((item, index) => (
                                <li key={index} className="p-4 bg-gray-100 rounded-lg">
                                    {item.isi_komentar}
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-600">Belum ada komentar. Jadilah yang pertama!</p>
                        )}
                    </ul>
                    {/* Form komentar */}
                    <form onSubmit={handleKomentarSubmit}>
                        <textarea
                            name="komentar"
                            rows="4"
                            className="w-full p-2 border rounded-lg mb-4"
                            placeholder="Tulis komentar Anda di sini..."
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            disabled={loadingKomentar}
                        >
                            {loadingKomentar ? "Mengirim..." : "Kirim Komentar"}
                        </button>
                    </form>
                </div>
            </div>

            <ModalLogin
                visible={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={() => navigate("/login")}
            />

            <IklanComponent />
        </div>
    );
};

export default BeritaPage;
