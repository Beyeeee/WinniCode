import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const schema = yup.object({
    nama_kategori: yup.string().required('Nama Kategori wajib diisi'),
    icon_kategori: yup
        .string()
        .matches(
            /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, // This regex matches all emoji characters
            'Masukkan emoji yang valid'
          )
        .required('Icon Kategori wajib diisi'),
});


const CreateKategoriModal = ({ isOpen, onClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

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
                                Add Kategori
                            </DialogTitle>
                            <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
                                <div>
                                    <label htmlFor="nama_kategori" className="block text-sm font-medium text-gray-700">
                                        Nama Kategori
                                    </label>
                                    <input
                                        type="text"
                                        id="nama_kategori"
                                        {...register('nama_kategori')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    <p className="text-red-500 text-xs">{errors.nama_kategori?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="icon_kategori" className="block text-sm font-medium text-gray-700">
                                        Icon Kategori (Emoji)
                                    </label>
                                    <input
                                        type="text"
                                        id="icon_kategori"
                                        {...register('icon_kategori')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        placeholder="Contoh: 😊"
                                    />
                                    <p className="text-red-500 text-xs">{errors.icon_kategori?.message}</p>
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

CreateKategoriModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default CreateKategoriModal;
