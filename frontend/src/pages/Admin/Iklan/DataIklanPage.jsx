import { useState, useEffect } from 'react';
import { getIklan, createIklan, editIklan, delIklan } from '../../../api/Admin/IklanApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateIklanModal from './ModalCreateIklan';
import ModalEditIklan from './ModalEditIklan';
import ModalDeleteIklan from './ModalDeleteIklan';

const DataIklanPage = () => {
    const [iklanList, setIklanList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedIklan, setSelectedIklan] = useState(null);

    useEffect(() => {
        const fetchIklan = async () => {
            setLoading(true);
            try {
                const response = await getIklan();
                if (response?.data?.length > 0) {
                    setIklanList(response.data);
                } else {
                    toast.error('Data iklan kosong atau tidak valid.');
                }
            } catch (error) {
                console.log(error);
                toast.error('Gagal memuat data iklan.');
            } finally {
                setLoading(false);
            }
        };

        fetchIklan();
    }, []);

    const handleCreate = async (data) => {
        try {
            const formData = new FormData();

            if (data.gambar_iklan && data.gambar_iklan[0]) {
                const file = data.gambar_iklan[0];
                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
                if (!allowedTypes.includes(file.type)) {
                    toast.error('File gambar harus bertipe jpeg, png, jpg, gif, atau svg.');
                    return;
                }
                formData.append('gambar_iklan', file);
            } else {
                toast.error('Silakan unggah gambar.');
                return;
            }

            Object.keys(data).forEach((key) => {
                if (key !== 'gambar_iklan') {
                    formData.append(key, data[key]);
                }
            });

            const response = await createIklan(formData);

            if (response?.data) {
                setIklanList((prev) => [response.data, ...prev]);
                toast.success('Iklan berhasil dibuat!');
                setOpenCreate(false);
            } else {
                toast.error('Terjadi kesalahan saat membuat iklan.');
            }
        } catch (error) {
            console.error('Error creating iklan:', error);
            toast.error('Terjadi kesalahan saat membuat iklan.');
        }
    };

    const handleEdit = (iklan) => {
        setSelectedIklan(iklan);
        setOpenEdit(true);
    };

    const handleUpdate = async (data) => {
        try {
            if (!selectedIklan?.id_iklan) {
                toast.error('Iklan yang akan diperbarui tidak valid.');
                return;
            }
            const response = await editIklan(selectedIklan.id_iklan, data);
            if (response?.data) {
                setIklanList((prev) =>
                    prev.map((item) => (item.id_iklan === response.data.id_iklan ? response.data : item))
                );
                toast.success('Iklan berhasil diperbarui!');
                setOpenEdit(false);
            } else {
                toast.error('Terjadi kesalahan saat memperbarui iklan.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Terjadi kesalahan saat memperbarui iklan.');
        }
    };

    const handleDelete = (iklan) => {
        setSelectedIklan(iklan);
        setOpenDelete(true);
    };

    const handleConfirmDelete = async () => {
        try {
            if (!selectedIklan?.id_iklan) {
                toast.error('Iklan yang akan dihapus tidak valid.');
                return;
            }
            const response = await delIklan(selectedIklan.id_iklan);
            if (response?.data) {
                setIklanList((prev) => prev.filter((item) => item.id_iklan !== selectedIklan.id_iklan));
                toast.success('Iklan berhasil dihapus!');
                setOpenDelete(false);
            } else {
                toast.error('Terjadi kesalahan saat menghapus iklan.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Terjadi kesalahan saat menghapus iklan.');
        }
    };

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <>
            <div className="flex flex-col h-[100vh] items-center">
                <div>
                    <h1 className="flex text-4xl py-4 font-bold">Iklan</h1>
                </div>
                <div className="flex flex-row justify-end w-[90%] pb-4">
                    <button
                        type="button"
                        onClick={() => setOpenCreate(true)}
                        className="inline-block rounded border border-indigo-600 px-6 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                    >
                        Add Iklan
                    </button>
                </div>
                <div className="w-[60%] items-center">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nama Iklan</th>
                                    <th>Gambar Iklan</th>
                                    <th>Link Iklan</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {iklanList.length > 0 ? (
                                    iklanList.map((iklan, index) => (
                                        <tr key={iklan?.id_iklan} className="bg-base-200">
                                            <td>{index + 1}</td>
                                            <td>{iklan?.nama_iklan || 'No Name'}</td>
                                            <td>
                                                {iklan?.gambar_iklan ? (
                                                    <img
                                                        src={`http://127.0.0.1:8000/storage/gambar/${iklan?.gambar_iklan}`}
                                                        alt={iklan?.nama_iklan}
                                                        className="w-26 h-24 object-cover"
                                                    />
                                                ) : (
                                                    'No Image'
                                                )}
                                            </td>
                                            <td>{iklan?.link_iklan || 'No Link'}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => handleEdit(iklan)}
                                                    className="w-16 bg-blue-400 rounded-md border"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(iklan)}
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
                                            No Iklan Available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <CreateIklanModal
                isOpen={openCreate}
                onClose={() => setOpenCreate(false)}
                onSubmit={handleCreate}
            />

            <ModalEditIklan
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                onSubmit={handleUpdate}
                selectedIklan={selectedIklan || {}}
            />

            <ModalDeleteIklan
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmDelete}
            />

            <ToastContainer />
        </>
    );
};

export default DataIklanPage;
