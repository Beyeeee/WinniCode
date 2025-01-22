import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getRole } from '../../../api/MO/RoleApi'; 

const schema = yup.object({
    id_role: yup.number().required('Role wajib dipilih'),
    nama_lengkap: yup.string().required('Nama lengkap wajib diisi').max(60, 'Nama maksimal 60 karakter'),
    email: yup.string().email('Email tidak valid').required('Email wajib diisi'),
    username: yup.string().required('Username wajib diisi'),
    password: yup.string().required('Password wajib diisi').min(6, 'Password minimal 6 karakter'),
    tanggal_lahir: yup.date().required('Tanggal lahir wajib diisi').max(new Date(), 'Tanggal lahir harus sebelum hari ini'),
    no_telp: yup.string().required('Nomor telepon wajib diisi').max(12, 'Nomor telepon maksimal 12 karakter'),
});

const CreatePegawaiModal = ({ isOpen, onClose, onSubmit }) => {
    const [roles, setRoles] = useState([]); 
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getRole(); 
                setRoles(response.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);

    const handleFormSubmit = async (data) => {
        const result = await onSubmit(data);
        if (result?.success) {
            reset();
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <DialogTitle as="h3" className="text-lg font-semibold text-center text-gray-900">
                                Tambah Pegawai
                            </DialogTitle>
                            <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
                                <div>
                                    <label htmlFor="id_role" className="block text-sm font-medium text-gray-700">
                                        Role
                                    </label>
                                    <select
                                        id="id_role"
                                        {...register('id_role')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    >
                                        <option value="">Pilih Role</option>
                                        {roles.map((role) => (
                                            <option key={role.id_role} value={role.id_role}>
                                                {role.id_role}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-red-500 text-xs">{errors.id_role?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="nama_lengkap" className="block text-sm font-medium text-gray-700">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        id="nama_lengkap"
                                        {...register('nama_lengkap')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    <p className="text-red-500 text-xs">{errors.nama_lengkap?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register('email')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    <p className="text-red-500 text-xs">{errors.email?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        {...register('username')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    <p className="text-red-500 text-xs">{errors.username?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        {...register('password')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    <p className="text-red-500 text-xs">{errors.password?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="tanggal_lahir" className="block text-sm font-medium text-gray-700">
                                        Tanggal Lahir
                                    </label>
                                    <input
                                        type="date"
                                        id="tanggal_lahir"
                                        {...register('tanggal_lahir')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    <p className="text-red-500 text-xs">{errors.tanggal_lahir?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="no_telp" className="block text-sm font-medium text-gray-700">
                                        Nomor Telepon
                                    </label>
                                    <input
                                        type="text"
                                        id="no_telp"
                                        {...register('no_telp')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    <p className="text-red-500 text-xs">{errors.no_telp?.message}</p>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="mt-3 inline-flex justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

CreatePegawaiModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default CreatePegawaiModal;
