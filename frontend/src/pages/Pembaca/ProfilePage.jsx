import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateGambar } from "../../api/Pembaca/ProfileApi";
import defaultPicture from "../../assets/img/default_profile.jpg";
import { FaPen } from "react-icons/fa"; 

const ProfilePage = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); 
    const [imageFile, setImageFile] = useState(null); 

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const profileResponse = await getProfile();
                console.log("Profile Response:", profileResponse);
                setProfileData(profileResponse.data);
            } catch (err) {
                console.error("Error fetching profile data:", err);
                setError("Terjadi kesalahan saat memuat data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);      

    const handleNavigate = (path) => {
        navigate(path);
    };

    const imageUrl = profileData && profileData.image_user
        ? `http://127.0.0.1:8000/storage/gambar/${profileData.image_user}`
        : defaultPicture;

    const handleImageClick = () => {
        setIsEditing(true);
        console.log("Edit image clicked");
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleImageUpload = async () => {
        if (!imageFile) {
            alert("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("image_user", imageFile);

        try {
            const response = await updateGambar(formData);
            console.log("Image uploaded:", response);

            setProfileData((prevData) => ({
                ...prevData,
                image_user: response.data.image_user,
            }));

            setIsEditing(false); 
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Please try again.");
        }
    };

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Profile Section */}
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Profile</h2>
                <div className="flex items-center space-x-4 relative group">
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover cursor-pointer"
                        onClick={handleImageClick}
                    />
                    <div className="absolute top-0 right-0 p-2 bg-white rounded-full shadow-md group-hover:block">
                        <FaPen
                            className="text-gray-700 cursor-pointer"
                            onClick={handleImageClick} 
                        />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">{profileData?.nama_lengkap}</h3>
                        <p className="text-gray-600">{profileData?.email}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-around mt-8">
                <button
                    onClick={() => handleNavigate("/pembaca/favorit")}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                    Lihat Favorit Berita
                </button>
            </div>

            {isEditing && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-2xl font-semibold mb-4">Edit Image</h3>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mb-4"
                        />
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
                            onClick={handleImageUpload}
                        >
                            Upload Image
                        </button>
                        <button
                            className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md ml-2"
                            onClick={() => setIsEditing(false)} 
                        >
                            Close Edit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
