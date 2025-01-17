import { useState, useEffect } from "react";
import { GetFavoritPembacabyLogin, delFavorit } from "../../api/Pembaca/FavoritApi";

const FavoritPage = () => {
  const [favorits, setFavorits] = useState([]); // State to store the favorite articles
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch favorites when the component mounts
  useEffect(() => {
    const fetchFavorits = async () => {
      try {
        const response = await GetFavoritPembacabyLogin();
        setFavorits(response.data); // Store the favorites data in state
      } catch (err) {
        setError("Gagal memuat favorit.");
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorits();
  }, []);

  // Handle favorite removal
  const handleRemoveFavorite = async (id) => {
    try {
      await delFavorit(id); // Call the delete API
      setFavorits(favorits.filter((favorit) => favorit.id_berita !== id)); // Remove from the state
      alert("Favorit berhasil dihapus.");
    } catch (err) {
      console.error("Error deleting favorite:", err);
      alert("Gagal menghapus favorit.");
    }
  };

  // Handle loading state and error
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Favorit Anda</h2>
      {favorits.length === 0 ? (
        <p className="text-gray-600">Anda belum menambahkan favorit.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorits.map((favorit) => (
            <div
              key={favorit.id_berita}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col"
            >
              <img
                src={`http://127.0.0.1:8000/storage/gambar/${favorit.gambar_berita}`}
                alt={favorit.judul_berita}
                className="w-full h-40 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {favorit.judul_berita}
              </h3>
              <p className="text-gray-600 mb-4">{favorit.deskripsi_berita}</p>
              <button
                onClick={() => handleRemoveFavorite(favorit.id_berita)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Hapus dari Favorit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritPage;
