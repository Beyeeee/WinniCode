import { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { getKategori } from '../../../api/Admin/KategoriApi';

const schema = yup.object({
    nama_kategori: yup.string().required('Nama Kategori wajib dipilih'),
    judul_berita: yup.string().required('Judul Berita wajib diisi'),
    gambar_berita: yup.mixed().required('Gambar Berita wajib diunggah'),
    nama_penulis: yup.string().required('Nama Penulis wajib diisi'),
    tanggal_berita: yup.date().required('Tanggal Berita wajib diisi'),
    isi_berita: yup.string().required('Isi Berita wajib diisi'),
});

const CreateBeritaModal = ({ isOpen, onClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const [kategoriList, setKategoriList] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const fetchKategori = async () => {
                try {
                    const response = await getKategori();
                    console.log('Kategori response:', response);
                    if (response.data) {
                        console.log("Masuk")
                        setKategoriList(response.data);
                    } else {
                        console.log("malah kesini")
                        setKategoriList([]);
                    }
                } catch (error) {
                    console.error('Error fetching kategori:', error);
                    setKategoriList([]);
                }
            };

            fetchKategori();
        }
    }, [isOpen]);

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
                                Add Berita
                            </DialogTitle>
                            <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
                                <div>
                                    <label htmlFor="nama_kategori" className="block text-sm font-medium text-gray-700">
                                        Nama Kategori
                                    </label>
                                    <select
                                        id="nama_kategori"
                                        {...register('nama_kategori')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    >
                                        <option value="">-- Pilih Kategori --</option>
                                        {kategoriList.map((kategori) => (
                                            <option key={kategori.id_kategori} value={kategori.nama_kategori}>
                                                {kategori.nama_kategori}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-red-500 text-xs">{errors.nama_kategori?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="judul_berita" className="block text-sm font-medium text-gray-700">
                                        Judul Berita
                                    </label>
                                    <input
                                        type="text"
                                        id="judul_berita"
                                        {...register('judul_berita')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    <p className="text-red-500 text-xs">{errors.judul_berita?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="gambar_berita" className="block text-sm font-medium text-gray-700">
                                        Gambar Berita
                                    </label>
                                    <input
                                        type="file"
                                        id="gambar_berita"
                                        {...register('gambar_berita')}
                                        accept="image/*"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    <p className="text-red-500 text-xs">{errors.gambar_berita?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="nama_penulis" className="block text-sm font-medium text-gray-700">
                                        Nama Penulis
                                    </label>
                                    <input
                                        type="text"
                                        id="nama_penulis"
                                        {...register('nama_penulis')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    <p className="text-red-500 text-xs">{errors.nama_penulis?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="tanggal_berita" className="block text-sm font-medium text-gray-700">
                                        Tanggal Berita
                                    </label>
                                    <input
                                        type="date"
                                        id="tanggal_berita"
                                        {...register('tanggal_berita')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    <p className="text-red-500 text-xs">{errors.tanggal_berita?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="isi_berita" className="block text-sm font-medium text-gray-700">
                                        Isi Berita
                                    </label>
                                    <textarea
                                        id="isi_berita"
                                        {...register('isi_berita')}
                                        rows="5"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    ></textarea>
                                    <p className="text-red-500 text-xs">{errors.isi_berita?.message}</p>
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

CreateBeritaModal.propTypes = {
    isOpen: PropTypes.bool.isRequired, 
    onClose: PropTypes.func.isRequired, 
    onSubmit: PropTypes.func.isRequired, 
};

export default CreateBeritaModal;
