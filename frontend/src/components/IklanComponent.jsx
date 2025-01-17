import { useState, useEffect } from "react";
import { getRandomIklan } from "../api/Admin/IklanApi";

const IklanComponent = () => {
    const [iklan, setIklan] = useState([]); 
    const [loading, setLoading] = useState(true); 

    const fetchAllIklan = async () => {
        try {
            const promises = Array.from({ length: 2 }, () => getRandomIklan());
            const responses = await Promise.all(promises);

            const iklanData = responses.map((res) => res.data);
            setIklan(iklanData);
        } catch (err) {
            console.error("Error fetching iklan:", err);
            setIklan([]); 
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchAllIklan();
    }, []);

    if (loading) {
        return <p>Loading iklan...</p>;
    }

    return (
        <div className="flex flex-col mt-8 mb-9 w-[20%] ml-3">
            {iklan.length > 0 ? (
                iklan.map((item, index) => (
                    <a
                        href={item.link_iklan}
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-4"
                    >
                        <img
                            src={`http://127.0.0.1:8000/storage/gambar/${item.gambar_iklan}`}
                            alt={item.nama_iklan}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </a>
                ))
            ) : (
                <p className="text-gray-600 text-center">Iklan tidak tersedia</p>
            )}
        </div>
    );
};

export default IklanComponent;
