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

    const hapusData = async (id) => {
        if (!window.confirm("Yakin hapus data?")) return;
        await axios.post("http://localhost/pweb/server/delete.php", { id });
        ambilData();
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

                {/* Header */}
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <h1 className="text-2xl font-bold flex items-center gap-2 text-purple-700">
                        <Users /> Data Mahasiswa
                    </h1>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            className="pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500"
                            placeholder="Cari mahasiswa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

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
                                <tr
                                    key={mhs.npm}
                                    className="hover:bg-purple-50 transition-colors"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        {i + 1}
                                    </td>

                                    {editMode === mhs.npm ? (
                                        <>
                                            <td className="px-6 py-4 font-mono text-sm">
                                                {mhs.npm}
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                                    value={formEdit.nama}
                                                    onChange={(e) => setFormEdit({ ...formEdit, nama: e.target.value })}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                                    value={formEdit.kelas}
                                                    onChange={(e) => setFormEdit({ ...formEdit, kelas: e.target.value })}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={simpanEdit}
                                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                                    >
                                                        <Save size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => setEditMode(null)}
                                                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4 font-mono text-sm text-gray-700">
                                                {mhs.npm}
                                            </td>
                                            <td className="px-6 py-4 text-gray-900 font-medium">
                                                {mhs.nama}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                                                    {mhs.kelas}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => navigate(`/mahasiswa/${mhs.id}`)}
                                                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => mulaiEdit(mhs)}
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => hapusData(mhs.id)}
                                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="mt-4 text-sm text-gray-500 text-center">
                    Total: {filteredMahasiswa.length} mahasiswa
                </div>

            </div>
        </div>
    );
}

export default Tabel;
