import { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit2, Trash2, Save, X, Users, Search, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Tabel() {
    const [mahasiswa, setMahasiswa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [editMode, setEditMode] = useState(null);
    const [formEdit, setFormEdit] = useState({ npm: '', nama: '', kelas: '' });

    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        ambilData();
    }, []);

    const ambilData = async () => {
        try {
            const res = await axios.get('http://localhost/pweb/server/read.php');
            setMahasiswa(res.data.data);
            setLoading(false);
        } catch {
            setError("Gagal mengambil data");
            setLoading(false);
        }
    };

    const hapusData = (id) => {
        setDeleteId(id);
        setShowDelete(true);
    };

    const confirmDelete = async () => {
        await axios.post("http://localhost/pweb/server/delete.php", { id: deleteId });
        ambilData();
        setShowDelete(false);
        setDeleteId(null);
    };

    const mulaiEdit = (mhs) => {
        setEditMode(mhs.npm);
        setFormEdit({ npm: mhs.npm, nama: mhs.nama, kelas: mhs.kelas });
    };

    const simpanEdit = async () => {
        await axios.post('http://localhost/pweb/server/update.php', formEdit);
        ambilData();
        setEditMode(null);
    };

    const filteredMahasiswa = mahasiswa.filter(mhs =>
        mhs.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mhs.npm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mhs.kelas.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p className="p-6">Loading...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-linear-to-r from-purple-50 via-white to-blue-50 p-6">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-purple-100 p-6">

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full min-w-[900px] border-collapse">
                        <thead>
                            <tr className="bg-linear-to-r from-purple-600 to-blue-600 text-white">
                                <th className="px-6 py-4 text-left text-sm font-semibold">No</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">NPM</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Kelas</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredMahasiswa.map((mhs, i) => (
                                <tr key={mhs.npm} className="hover:bg-purple-50 transition-colors">
                                    <td className="px-6 py-4">{i + 1}</td>
                                    <td className="px-6 py-4">{mhs.npm}</td>
                                    <td className="px-6 py-4">{mhs.nama}</td>
                                    <td className="px-6 py-4">{mhs.kelas}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => navigate(`/mahasiswa/${mhs.id}`)} className="px-4 py-2 bg-purple-500 text-white rounded-lg"><Eye size={16} /></button>
                                            <button onClick={() => mulaiEdit(mhs)} className="px-4 py-2 bg-blue-500 text-white rounded-lg"><Edit2 size={16} /></button>
                                            <button onClick={() => hapusData(mhs.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* MODAL DELETE */}
                {showDelete && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                            <div className="text-center space-y-4">
                                <Trash2 className="mx-auto text-red-500" size={40} />
                                <h2 className="text-xl font-bold">Hapus Data?</h2>
                                <p className="text-gray-500">Data yang dihapus tidak bisa dikembalikan.</p>
                                <div className="flex gap-3">
                                    <button onClick={() => setShowDelete(false)} className="w-full border py-2 rounded-lg">
                                        Batal
                                    </button>
                                    <button onClick={confirmDelete} className="w-full bg-red-500 text-white py-2 rounded-lg">
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Tabel;
