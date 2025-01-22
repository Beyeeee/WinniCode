import { useState, useEffect } from 'react';
import { getPegawai, delPegawai, editRolePegawai } from '../../../api/MO/PegawaiApi';
import { RegisterPegawai } from '../../../api/AuthApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePegawaiModal from './ModalCreatePegawai';
import ModalEditPegawai from './ModalEditPegawai';
import ModalDeletePegawai from './ModalDeletePegawai';

const DataPegawaiPage = () => {
    const [pegawaiList, setPegawaiList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedPegawai, setSelectedPegawai] = useState(null);

    useEffect(() => {
        const fetchPegawai = async () => {
            setLoading(true);
            try {
                const response = await getPegawai();
                if (response?.data?.length > 0) {
                    setPegawaiList(response.data);
                } else {
                    toast.error('Data pegawai kosong atau tidak valid.');
                }
            } catch (error) {
                console.error('Error fetching pegawai:', error);
                toast.error('Gagal memuat data pegawai.');
            } finally {
                setLoading(false);
            }
        };

        fetchPegawai();
    }, []);

    const handleCreate = async (data) => {
        try {
            // Format the tanggal_lahir date to the proper format (YYYY-MM-DD)
            if (data.tanggal_lahir) {
                const formattedDate = new Date(data.tanggal_lahir).toISOString().split('T')[0];
                data.tanggal_lahir = formattedDate;
            }
    
            // Proceed with the API request
            const response = await RegisterPegawai(data);
            if (response?.data) {
                setPegawaiList((prev) => [response.data, ...prev]);
                toast.success('Pegawai berhasil ditambahkan!');
                setOpenCreate(false);
            } else {
                toast.error('Terjadi kesalahan saat menambahkan pegawai.');
            }
        } catch (error) {
            console.error('Error creating pegawai:', error);
            toast.error('Terjadi kesalahan saat menambahkan pegawai.');
        }
    };
    

    const handleEdit = (pegawai) => {
        setSelectedPegawai(pegawai);
        setOpenEdit(true);
    };

    const handleUpdate = async (data) => {
        try {
            console.log(selectedPegawai)
            if (!selectedPegawai?.id_user) {
                toast.error('Pegawai yang akan diperbarui tidak valid.');
                return;
            }
            
            const response = await editRolePegawai(selectedPegawai.id_user, { nama_role: data.nama_role });
            
            console.log(response?.data)
            if (response?.data) {
                setPegawaiList((prev) =>
                    prev.map((item) =>
                        item.id_user === selectedPegawai.id_user
                            ? { ...item, role: { ...item.role, nama_role: data.nama_role } }
                            : item
                    )
                );
                toast.success('Role Pegawai berhasil diperbarui!');
                setOpenEdit(false);
            } else {
                toast.error('Terjadi kesalahan saat memperbarui pegawai.');
            }
        } catch (error) {
            console.error('Error updating pegawai:', error);
            toast.error('Terjadi kesalahan saat memperbarui pegawai.');
        }
    };    

    const handleDelete = (pegawai) => {
        setSelectedPegawai(pegawai);
        setOpenDelete(true);
    };

    const handleConfirmDelete = async () => {
        try {
            console.log(selectedPegawai)
            if (!selectedPegawai?.id_user) {
                toast.error('Pegawai yang akan dihapus tidak valid.');
                return;
            }
            const response = await delPegawai(selectedPegawai.id_user);
            if (response?.data) {
                setPegawaiList((prev) => prev.filter((item) => item.id_user !== selectedPegawai.id_user));
                toast.success('Pegawai berhasil dihapus!');
                setOpenDelete(false);
            } else {
                toast.error('Terjadi kesalahan saat menghapus pegawai.');
            }
        } catch (error) {
            console.error('Error deleting pegawai:', error);
            toast.error('Terjadi kesalahan saat menghapus pegawai.');
        }
    };

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <>
            <div className="flex flex-col h-[100vh] items-center">
                <div>
                    <h1 className="flex text-4xl py-4 font-bold">Pegawai</h1>
                </div>
                <div className="flex flex-row justify-end w-[90%] pb-4">
                    <button
                        type="button"
                        onClick={() => setOpenCreate(true)}
                        className="inline-block rounded border border-indigo-600 px-6 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                    >
                        Add Pegawai
                    </button>
                </div>
                <div className="w-[60%] items-center">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nama Pegawai</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {pegawaiList.length > 0 ? (
                                    pegawaiList.map((pegawai, index) => (
                                        <tr key={pegawai?.id_pegawai} className="bg-base-200">
                                            <td>{index + 1}</td>
                                            <td>{pegawai?.nama_lengkap || 'No Name'}</td>
                                            <td>{pegawai?.email || 'No Email'}</td>
                                            <td>{pegawai?.role?.nama_role || 'No Role'}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => handleEdit(pegawai)}
                                                    className="w-16 bg-blue-400 rounded-md border"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(pegawai)}
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
                                            No Pegawai Available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <CreatePegawaiModal
                isOpen={openCreate}
                onClose={() => setOpenCreate(false)}
                onSubmit={handleCreate}
            />

            <ModalEditPegawai
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                onSubmit={handleUpdate}
                selectedPegawai={selectedPegawai || {}}
            />

            <ModalDeletePegawai
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmDelete}
            />

            <ToastContainer />
        </>
    );
};

export default DataPegawaiPage;
