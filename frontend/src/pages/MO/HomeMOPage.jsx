import { useEffect, useState } from "react";
import { getPegawai } from "../../api/MO/PegawaiApi";
import { getBerita } from "../../api/Pembaca/BeritaApi";

const HomePageMO = () => {
    const [beritaCount, setBeritaCount] = useState(0);
    const [pegawaiCount, setPegawaiCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const beritaResponse = await getBerita();
                const pegawaiResponse = await getPegawai();

                setBeritaCount(beritaResponse.data.length);
                setPegawaiCount(pegawaiResponse.data.length);

            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <section className="bg-blue-500 text-white py-20 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Selamat Datang, Manajer Operasional!
                </h2>
                <p className="text-lg md:text-xl">
                    Pantau dan kelola operasional harian dengan mudah dan efisien.
                </p>
            </section>

            <section id="dashboard" className="py-12 bg-gray-100">
                <div className="container mx-auto px-5">
                    <h3 className="text-2xl font-bold mb-8 text-center">Dashboard</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="bg-white p-6 rounded-lg shadow text-center w-64">
                            <h4 className="text-lg font-semibold mb-2">Total Pegawai</h4>
                            <p className="text-3xl font-bold">{pegawaiCount}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow text-center w-64">
                            <h4 className="text-lg font-semibold mb-2">Berita</h4>
                            <p className="text-3xl font-bold">{beritaCount}</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePageMO;
