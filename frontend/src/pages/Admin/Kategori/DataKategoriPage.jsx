import { useState, useEffect } from 'react';
import { getKategori, delKategori, editKategori, createKategori } from '../../../api/Admin/KategoriApi';
import CreateKategoriModal from './ModalCreateKategori';
import ModalEditKategori from './ModalEditKategori';
import ModalDeleteKategori from './ModalDeleteKategori';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DataKategoriPage = () => {
    const [kategoriList, setKategoriList] = useState([]);
    const [selectedKategori, setSelectedKategori] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    useEffect(() => {
        const fetchKategori = async () => {
            try {
                const response = await getKategori();
                setKategoriList(response.data);
            } catch (error) {
                console.error('Error fetching kategori:', error);
                toast.error('Gagal memuat data kategori!');
            }
        };

        fetchKategori();
    }, []);

    const handleCreate = async (newKategori) => {
        try {
            const response = await createKategori(newKategori);
            setKategoriList((prevList) => [...prevList, response.data]);
            setOpenCreate(false);
            toast.success('Kategori berhasil ditambahkan!');
        } catch (error) {
            console.error('Error creating kategori:', error);
            toast.error('Gagal menambahkan kategori!');
        }
    };

    const handleEdit = async (updatedKategori) => {
        try { 
            const response = await editKategori(updatedKategori.id_kategori, updatedKategori);
            
            if (response && response.data) {
                setKategoriList((prevList) =>
                    prevList.map((kategori) =>
                        kategori.id_kategori === updatedKategori.id_kategori ? updatedKategori : kategori
                    )
                );
    
                setOpenEdit(false); 
                toast.success('Kategori berhasil diperbarui!');
            } else {
                throw new Error('Kategori not found or update failed');
            }
        } catch (error) {
            console.error('Error editing kategori:', error);
            toast.error(error?.message || 'Gagal memperbarui kategori!');
        }
    };    

    const handleDelete = async () => {
        try {
            await delKategori(selectedKategori.id_kategori);
            setKategoriList((prevList) => prevList.filter((kategori) => kategori.id_kategori !== selectedKategori.id_kategori));
            setOpenDelete(false);
            toast.success('Kategori berhasil dihapus!');
        } catch (error) {
            console.error('Error deleting kategori:', error);
            toast.error('Gagal menghapus kategori!');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col h-[100vh] items-center">
                <div>
                    <h1 className="flex text-4xl py-4 font-bold">Kategori</h1>
                </div>
                <div className="flex flex-row justify-end w-[90%] pb-4">
                    <button
                        type="button"
                        onClick={() => setOpenCreate(true)}
                        className="inline-block rounded border border-indigo-600 px-6 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                    >
                        Add Kategori
                    </button>
                </div>
                <div className="w-[60%] items-center">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nama Kategori</th>
                                    <th>Icon Kategori</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {kategoriList.map((kategori, index) => (
                                    <tr key={kategori.id_kategori} className={index % 2 === 0 ? 'bg-base-200' : ''}>
                                        <td>{index + 1}</td>
                                        <td>{kategori.nama_kategori}</td>
                                        <td>{kategori.icon_kategori}</td>
                                        <td className="flex justify-center space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    console.log('Selected Category for Edit:', kategori);
                                                    setSelectedKategori(kategori); // Set selected kategori for editing
                                                    setOpenEdit(true); // Open the edit modal
                                                }}
                                                className="w-16 bg-blue-400 rounded-md border"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedKategori(kategori); // Set selected kategori for deletion
                                                    setOpenDelete(true); // Open the delete modal
                                                }}
                                                className="w-16 bg-red-500 rounded-md border text-white"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Create */}
            {openCreate && (
                <CreateKategoriModal
                    isOpen={openCreate}
                    onClose={() => setOpenCreate(false)}
                    onSubmit={handleCreate}
                />
            )}

            {/* Modal Edit */}
            {openEdit && (
                <ModalEditKategori
                    isOpen={openEdit}
                    onClose={() => setOpenEdit(false)}
                    onSubmit={handleEdit}
                    selectedKategori={selectedKategori}
                />
            )}

            {/* Modal Delete */}
            {openDelete && (
                <ModalDeleteKategori
                    isOpen={openDelete}
                    onClose={() => setOpenDelete(false)}
                    onConfirm={handleDelete}
                />
            )}
        </>
    );
};

export default DataKategoriPage;
