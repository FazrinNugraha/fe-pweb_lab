import { useState } from 'react';
import axios from 'axios';

function Form() {
    const [nama, setNama] = useState('');
    const [npm, setNpm] = useState('');
    const [kelas, setKelas] = useState('');
    const [status, setStatus] = useState(''); // State untuk pesan

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sedang mengirim...'); // Feedback loading

        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("npm", npm);
        formData.append("kelas", kelas);

        try {
            // Pastikan URL ini benar sesuai folder di htdocs kamu
            const response = await axios.post('http://localhost/pweb/server/create.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            console.log("Response PHP:", response.data); // Cek console browser (F12)
            setStatus('Data berhasil ditambah!');
            
            // Kosongkan form setelah sukses
            setNama('');
            setNpm('');
            setKelas('');
            
        } catch (error) {
            console.error('Error:', error);
            setStatus('Gagal mengirim data. Cek Console (F12) untuk detail.');
        }
    };

    return (
        <div className="p-6 text-center bg-linear-to-r from-white to-purple-50 shadow-2xl rounded-2xl max-w-md mx-auto border-2 border-purple-200">
            <div className="mb-6">
                <div className=" bg-linear-to-r from-purple-600 to-indigo-600 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                    <span className="text-1xl"></span>
                </div>
                <h3 className="text-2xl font-bold bg-linear-to-r  from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                    Input Mahasiswa
                </h3>
            </div>
            
            {/* TAMPILKAN STATUS DI SINI */}
            {status && (
                <div className={`p-4 mb-5 rounded-xl font-semibold animate-pulse shadow-md ${
                    status.includes('Gagal') 
                        ? 'bg-linear-to-r  from-red-100 to-red-50 text-red-700 border-2 border-red-300' 
                        : 'bg-linear-to-r  from-green-100 to-green-50 text-green-700 border-2 border-green-300'
                }`}>
                    {status}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                <div className="relative">
                    <label className="block font-semibold text-purple-800 mb-2">Nama:</label>
                    <input
                        type="text"
                        className="w-full p-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white hover:border-purple-400"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                        placeholder="Masukkan nama lengkap"
                    />
                </div>
                <div className="relative">
                    <label className="block font-semibold text-purple-800 mb-2">NPM:</label>
                    <input  
                        type="text"
                        className="w-full p-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white hover:border-purple-400"
                        value={npm}
                        onChange={(e) => setNpm(e.target.value)}
                        required
                        placeholder="Masukkan NPM"
                    />
                </div>
                <div className="relative">
                    <label className="block font-semibold text-purple-800 mb-2">Kelas:</label>
                    <input
                        type="text"
                        className="w-full p-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white hover:border-purple-400"
                        value={kelas}
                        onChange={(e) => setKelas(e.target.value)}
                        required
                        placeholder="Masukkan kelas"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-linear-to-r  from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                     Simpan Data
                </button>
            </form>
        </div>
    );
}

export default Form;