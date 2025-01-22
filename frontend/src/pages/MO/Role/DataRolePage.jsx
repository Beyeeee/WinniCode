import { useState, useEffect } from 'react';
import { getRole, editRole, delRole, CreateRole } from "../../../api/MO/RoleApi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateRoleModal from './ModalCreateRole';
import ModalEditRole from './ModalEditRole';
import DeleteRoleModal from './ModalDeleteRole';

const DataRolePage = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false); // State for delete modal
    const [selectedRole, setSelectedRole] = useState(null);
    const [roleList, setRoleList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            setLoading(true);
            try {
                const response = await getRole();
                if (response?.data?.length > 0) {
                    setRoleList(response.data);
                } else {
                    console.error('Data role kosong atau tidak valid:', response);
                    toast.error('Data role kosong atau tidak valid.');
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
                toast.error('Gagal memuat data role.');
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    const handleCreateRole = async (data) => {
        try {
            const response = await CreateRole(data);
            if (response?.data) {
                setRoleList((prev) => [response.data, ...prev]);
                toast.success('Role berhasil dibuat!');
                setOpenCreate(false);
            } else {
                toast.error('Terjadi kesalahan saat membuat role.');
            }
        } catch (error) {
            console.error('Error creating role:', error);
            toast.error('Terjadi kesalahan saat membuat role.');
        }
    };

    const handleEdit = (role) => {
        if (role && role.id_role) {
            setSelectedRole(role);
            setOpenEdit(true);
        } else {
            toast.error('Data role tidak valid untuk diedit.');
        }
    };

    const handleUpdateRole = async (data) => {
        try {
            if (!selectedRole?.id_role) {
                toast.error('Role yang akan diupdate tidak valid.');
                return;
            }
            const response = await editRole(selectedRole.id_role, data);
            if (response?.data) {
                setRoleList((prev) =>
                    prev.map((item) =>
                        item.id_role === response.data.id_role ? response.data : item
                    )
                );
                setOpenEdit(false);
                toast.success('Role berhasil diperbarui!');
            } else {
                toast.error('Terjadi kesalahan saat update role.');
            }
        } catch (error) {
            console.error('Error updating role:', error);
            toast.error('Terjadi kesalahan saat memperbarui role.');
        }
    };

    const handleDelete = (role) => {
        setSelectedRole(role);
        setOpenDelete(true);
    };

    const handleConfirmDelete = async () => {
        try {
            if (!selectedRole?.id_role) {
                toast.error('Role yang akan dihapus tidak valid.');
                return;
            }
            const response = await delRole(selectedRole.id_role);
            if (response?.data) {
                setRoleList((prev) => prev.filter((item) => item.id_role !== selectedRole.id_role));
                toast.success('Role berhasil dihapus!');
                setOpenDelete(false);
            } else {
                toast.error('Terjadi kesalahan saat menghapus role.');
            }
        } catch (error) {
            console.error('Error deleting role:', error);
            toast.error('Terjadi kesalahan saat menghapus role.');
        }
    };

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <>
            <div className="flex flex-col h-[100vh] items-center">
                <div>
                    <h1 className="flex text-4xl py-4 font-bold">Role</h1>
                </div>
                <div className="flex flex-row justify-end w-[90%] pb-4">
                    <button
                        type="button"
                        onClick={() => setOpenCreate(true)}
                        className="inline-block rounded border border-indigo-600 px-6 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                    >
                        Add Role
                    </button>
                </div>
                <div className="w-[90%] items-center">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Role Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {roleList.length > 0 ? (
                                    roleList.map((role, index) => (
                                        <tr key={role?.id_role} className="bg-base-200">
                                            <td>{index + 1}</td>
                                            <td>{role?.nama_role || 'No Role Name'}</td>
                                            <td className="flex justify-center space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleEdit(role)}
                                                    className="w-16 bg-blue-400 rounded-md border"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(role)}
                                                    className="w-16 bg-red-500 rounded-md border text-white"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            No Roles Available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <CreateRoleModal
                isOpen={openCreate}
                onClose={() => setOpenCreate(false)}
                onSubmit={handleCreateRole}
            />

            <ModalEditRole
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                onSubmit={handleUpdateRole}
                selectedRole={selectedRole || {}}
            />

            <DeleteRoleModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmDelete}
            />

            <ToastContainer />
        </>
    );
};

export default DataRolePage;
