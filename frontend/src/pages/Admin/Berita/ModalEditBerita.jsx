import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getKategori } from '../../../api/Admin/KategoriApi';

const schema = yup.object({
    nama_kategori: yup.string().required('Nama Kategori wajib diisi'),
    judul_berita: yup.string().required('Judul Berita wajib diisi'),
    nama_penulis: yup.string().required('Nama Penulis wajib diisi'),
    tanggal_berita: yup.date().required('Tanggal Berita wajib diisi'),
    isi_berita: yup.string().required('Isi Berita wajib diisi'),
});

const ModalEditBerita = ({ isOpen, onClose, onSubmit, selectedBerita }) => {
    const [kategoriList, setKategoriList] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            nama_kategori: '',
            judul_berita: '',
            nama_penulis: '',
            tanggal_berita: '',
            isi_berita: '',
        },
    });

    useEffect(() => {
        if (selectedBerita) {
            reset({
                nama_kategori: selectedBerita.nama_kategori || '',
                judul_berita: selectedBerita.judul_berita || '',
                nama_penulis: selectedBerita.nama_penulis || '',
                tanggal_berita: selectedBerita.tanggal_berita || '',
                isi_berita: selectedBerita.isi_berita || '',
            });
        }
    }, [selectedBerita, reset]);

    useEffect(() => {
        const fetchKategori = async () => {
            const response = await getKategori();
            if (response.data) {
                setKategoriList(response.data);
            } else {
                setKategoriList([]);
            }
        };

        if (isOpen) {
            fetchKategori();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <DialogTitle as="h3" className="text-lg font-semibold text-center text-gray-900">
                                Edit Berita
                            </DialogTitle>
                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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

ModalEditBerita.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    selectedBerita: PropTypes.object,
};

export default ModalEditBerita;
