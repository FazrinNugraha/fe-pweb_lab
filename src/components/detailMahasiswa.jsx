import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DetailMahasiswa() {
    const { id } = useParams(); // ambil ID dari URL
    const [mhs, setMhs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rawResponse, setRawResponse] = useState(null);

    useEffect(() => {
        console.log("ID dari URL:", id);

        axios
            .get(`http://localhost/pweb/server/detail.php?id=${id}`)
            .then(res => {
                console.log("Response backend:", res.data);
                setRawResponse(res.data);
                setMhs(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Axios error:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-lg font-medium text-gray-600">Loading...</p>
            </div>
        );
    }

    if (!mhs) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
                <p className="text-red-500 text-lg font-semibold">
                    Data tidak ditemukan
                </p>

                <pre className="mt-4 w-full max-w-3xl bg-white p-4 rounded-xl shadow text-xs text-gray-700 overflow-auto">
                    {JSON.stringify(rawResponse, null, 2)}
                </pre>

                <p className="mt-2 text-sm text-gray-500">
                    ID dari URL: <b>{id}</b>
                </p>

                <Link
                    to="/"
                    className="mt-6 text-purple-600 font-medium underline"
                >
                    Kembali
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-r from-purple-50 via-white to-blue-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 border border-purple-100">
                <h1 className="text-3xl font-bold text-center mb-8 bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Detail Mahasiswa
                </h1>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
                        <tbody>
                            <tr className="bg-gray-50">
                                <td className="px-6 py-4 font-semibold text-gray-700 w-1/3">
                                    ID
                                </td>
                                <td className="px-6 py-4 text-gray-900">
                                    {mhs.id}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-semibold text-gray-700">
                                    NPM
                                </td>
                                <td className="px-6 py-4 text-gray-900">
                                    {mhs.npm}
                                </td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-6 py-4 font-semibold text-gray-700">
                                    Nama
                                </td>
                                <td className="px-6 py-4 text-gray-900">
                                    {mhs.nama}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-semibold text-gray-700">
                                    Kelas
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                                        {mhs.kelas}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 flex justify-center">
                    <Link
                        to="/"
                        className="px-8 py-3 rounded-xl bg-linear-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition shadow-lg"
                    >
                        ⬅ Kembali ke Tabel
                    </Link>
                </div>
            </div>
        </div>
    );
}
