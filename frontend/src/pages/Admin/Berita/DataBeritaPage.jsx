import { useState, useEffect } from 'react';
import { createBerita, getBerita, editBerita, delBerita } from '../../../api/Pembaca/BeritaApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateBeritaModal from './ModalCreateBerita';
import ModalEditBerita from './ModalEditBerita';
import DeleteBeritaModal from './ModalDeletePage';

const BeritaPage = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false); // State untuk modal delete
    const [selectedBerita, setSelectedBerita] = useState(null);
    const [beritaList, setBeritaList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBerita = async () => {
            setLoading(true);
            try {
                const response = await getBerita();
                if (response?.data?.length > 0) {
                    setBeritaList(response.data);
                } else {
                    console.error('Data berita kosong atau tidak valid:', response);
                    toast.error('Data berita kosong atau tidak valid.');
                }
            } catch (error) {
                console.error('Error fetching berita:', error);
                toast.error('Gagal memuat data berita.');
            } finally {
                setLoading(false);
            }
        };

        fetchBerita();
    }, []);

    const handleCreateBerita = async (data) => {
        try {
            const formData = new FormData();
            if (data.tanggal_berita) {
                const formattedDate = new Date(data.tanggal_berita).toISOString().split('T')[0];
                formData.append('tanggal_berita', formattedDate);
            }
            if (data.gambar_berita && data.gambar_berita[0]) {
                const file = data.gambar_berita[0];
                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
                if (!allowedTypes.includes(file.type)) {
                    toast.error('File gambar harus bertipe jpeg, png, jpg, gif, atau svg.');
                    return;
                }
                formData.append('gambar_berita', file);
            } else {
                toast.error('Silakan unggah gambar.');
                return;
            }
            Object.keys(data).forEach((key) => {
                if (key !== 'tanggal_berita' && key !== 'gambar_berita') {
                    formData.append(key, data[key]);
                }
            });
            const response = await createBerita(formData);
            if (response?.data) {
                setBeritaList((prev) => [response.data, ...prev]);
                toast.success('Berita berhasil dibuat!');
                setOpenCreate(false);
            } else {
                toast.error('Terjadi kesalahan saat membuat berita.');
            }
        } catch (error) {
            console.error('Error creating berita:', error);
            toast.error('Terjadi kesalahan saat membuat berita.');
        }
    };

    const handleEdit = (berita) => {
        if (berita && berita.id_berita) {
            setSelectedBerita(berita);
            setOpenEdit(true);
        } else {
            toast.error('Data berita tidak valid untuk diedit.');
        }
    };

    const handleUpdateBerita = async (data) => {
        try {
            if (!selectedBerita?.id_berita) {
                toast.error('Berita yang akan diupdate tidak valid.');
                return;
            }
            const formData = new FormData();
            if (data.tanggal_berita) {
                const formattedDate = new Date(data.tanggal_berita).toISOString().split('T')[0];
                formData.append('tanggal_berita', formattedDate);
            }
            Object.keys(data).forEach((key) => {
                if (key !== 'tanggal_berita') {
                    formData.append(key, data[key]);
                }
            });
            const response = await editBerita(selectedBerita.id_berita, formData);
            if (response?.data) {
                setBeritaList((prev) =>
                    prev.map((item) =>
                        item.id_berita === response.data.id_berita ? response.data : item
                    )
                );
                setOpenEdit(false);
                toast.success('Berita berhasil diperbarui!');
            } else {
                toast.error('Terjadi kesalahan saat update berita.');
            }
        } catch (error) {
            console.error('Error updating berita:', error);
            toast.error('Terjadi kesalahan saat memperbarui berita.');
        }
    };

    const handleDelete = (berita) => {
        setSelectedBerita(berita);
        setOpenDelete(true);
    };

    const handleConfirmDelete = async () => {
        try {
            if (!selectedBerita?.id_berita) {
                toast.error('Berita yang akan dihapus tidak valid.');
                return;
            }
            const response = await delBerita(selectedBerita.id_berita);
            if (response?.data) {
                setBeritaList((prev) => prev.filter((item) => item.id_berita !== selectedBerita.id_berita));
                toast.success('Berita berhasil dihapus!');
                setOpenDelete(false);
            } else {
                toast.error('Terjadi kesalahan saat menghapus berita.');
            }
        } catch (error) {
            console.error('Error deleting berita:', error);
            toast.error('Terjadi kesalahan saat menghapus berita.');
        }
    };

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <>
            <div className="flex flex-col h-[100vh] items-center">
                <div>
                    <h1 className="flex text-4xl py-4 font-bold">Berita</h1>
                </div>
                <div className="flex flex-row justify-end w-[90%] pb-4">
                    <button
                        type="button"
                        onClick={() => setOpenCreate(true)}
                        className="inline-block rounded border border-indigo-600 px-6 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                    >
                        Add Berita
                    </button>
                </div>
                <div className="w-[90%] items-center">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Judul Berita</th>
                                    <th>Penulis</th>
                                    <th>Tanggal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {beritaList.length > 0 ? (
                                    beritaList.map((berita, index) => (
                                        <tr key={berita?.id_berita} className="bg-base-200">
                                            <td>{index + 1}</td>
                                            <td>{berita?.judul_berita || 'No Title'}</td>
                                            <td>{berita?.nama_penulis || 'No Author'}</td>
                                            <td>{new Date(berita?.tanggal_berita).toLocaleDateString() || 'No Date'}</td>
                                            <td className="flex justify-center space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleEdit(berita)}
                                                    className="w-16 bg-blue-400 rounded-md border"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(berita)}
                                                    className="w-16 bg-red-500 rounded-md border text-white"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No Berita Available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <CreateBeritaModal
                isOpen={openCreate}
                onClose={() => setOpenCreate(false)}
                onSubmit={handleCreateBerita}
            />

            <ModalEditBerita
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                onSubmit={handleUpdateBerita}
                selectedBerita={selectedBerita || {}}
            />

            <DeleteBeritaModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmDelete}
            />

            <ToastContainer />
        </>
    );
};

export default BeritaPage;
