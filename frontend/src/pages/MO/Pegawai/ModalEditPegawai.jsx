import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getRole } from '../../../api/MO/RoleApi';

const schema = yup.object({
    nama_role: yup.string().required('Nama Role wajib diisi'),
});

const ModalEditPegawai = ({ isOpen, onClose, onSubmit, selectedPegawai }) => {
    const [roles, setRoles] = useState([]); 
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            nama_role: '', 
        },
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

    useEffect(() => {
        if (selectedPegawai) {
            reset({
                nama_role: selectedPegawai?.role?.nama_role || '', 
            });
        }
    }, [selectedPegawai, reset]);

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <DialogTitle as="h3" className="text-lg font-semibold text-center text-gray-900">
                                Edit Role Pegawai
                            </DialogTitle>
                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                {/* Nama Role */}
                                <div>
                                    <label htmlFor="nama_role" className="block text-sm font-medium text-gray-700">
                                        Nama Role
                                    </label>
                                    <select
                                        id="nama_role"
                                        {...register('nama_role')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    >
                                        <option value="">Pilih Role</option>
                                        {roles.map((role) => (
                                            <option key={role.id_role} value={role.nama_role}>
                                                {role.nama_role}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-red-500 text-xs">{errors.nama_role?.message}</p>
                                </div>

                                {/* Buttons */}
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

ModalEditPegawai.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    selectedPegawai: PropTypes.object,
};

export default ModalEditPegawai;
