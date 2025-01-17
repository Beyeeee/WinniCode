
import PropTypes from "prop-types"; // Tambahkan ini

const ModalLogin = ({ visible, onClose, onLogin }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-bold mb-4">Anda Harus Login</h2>
                <p className="text-gray-700 mb-6">
                    Anda harus login terlebih dahulu untuk memberikan komentar.
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onLogin}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

// Tambahkan validasi PropTypes
ModalLogin.propTypes = {
    visible: PropTypes.bool.isRequired,  // 'visible' harus boolean dan wajib diisi
    onClose: PropTypes.func.isRequired, // 'onClose' harus fungsi dan wajib diisi
    onLogin: PropTypes.func.isRequired, // 'onLogin' harus fungsi dan wajib diisi
};

export default ModalLogin;
