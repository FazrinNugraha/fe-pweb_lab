import { User, Mail, Phone, MapPin, BookOpen, Trophy } from 'lucide-react';

const BioDashboard = () => {
    const biodata = {
        nama: "Muhamad Fazrin Nugraha",
        email: "nugrahafadzrin@gmail.com",
        telepon: "+62 812-3456-7890",
        alamat: "Jakarta, Indonesia",
        universitas: "Universitas Gunadarma",
        program_studi: "Teknik Informatika",
        nim: "12345678",
        foto: "/image/foto-1.jpeg",
        deskripsi: "Seorang mahasiswa yang bersemangat dalam mengembangkan skill programming dan web development."
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-10">
            <div className="max-w-5xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">

                    {/* Header Ungu */}
                    <div className="h-40 bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-800" />

                    {/* Konten */}
                    <div className="px-6 md:px-12 py-10">
                        <div className="flex flex-col md:flex-row items-start gap-8 mb-10">

                            {/* FOTO – naik ke header */}
                            <div className="mx-auto md:mx-0 -mt-24">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-80 animate-pulse"></div>
                                    <img
                                        src={biodata.foto}
                                        alt={biodata.nama}
                                        className="relative w-52 h-52 rounded-full border-8 border-white shadow-xl object-cover"
                                    />
                                </div>
                            </div>

                            {/* NAMA – tetap di area putih */}
                            <div className="flex-1 pt-10">
                                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 animate-slide-in">
                                    {biodata.nama}
                                </h1>
                                <p className="text-gray-600 text-lg mb-6 animate-slide-in-delayed">
                                    {biodata.deskripsi}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <span className="bg-purple-100 text-purple-800 px-5 py-2 rounded-full font-semibold text-sm">
                                        {biodata.program_studi}
                                    </span>
                                    <span className="bg-pink-100 text-pink-800 px-5 py-2 rounded-full font-semibold text-sm">
                                        NIM: {biodata.nim}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                            <InfoCard icon={<Mail />} label="Email" value={biodata.email} color="purple" />
                            <InfoCard icon={<Phone />} label="Telepon" value={biodata.telepon} color="pink" />
                            <InfoCard icon={<MapPin />} label="Alamat" value={biodata.alamat} color="indigo" />
                            <InfoCard icon={<BookOpen />} label="Universitas" value={biodata.universitas} color="blue" />
                        </div>

                        {/* Statistik */}
                        <div className="grid grid-cols-3 gap-4 border-y py-8 mb-8">
                            <Stat icon={<Trophy />} value="10+" label="Projects" color="purple" />
                            <Stat icon={<User />} value="Active" label="Student" color="pink" />
                            <Stat icon={<BookOpen />} value="On Going" label="Learning" color="indigo" />
                        </div>

                        {/* CTA */}
                        <div className="flex justify-center gap-4 flex-wrap">
                            <a
                                href="/tampilkan"
                                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition"
                            >
                                Lihat Data
                            </a>
                            <a
                                href="/"
                                className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition"
                            >
                                Input Data
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
  );
};

const InfoCard = ({ icon, label, value, color }) => (
    <div className={`flex items-center gap-4 p-4 rounded-lg bg-${color}-50 hover:bg-${color}-100 transition`}>
        <div className={`h-12 w-12 flex items-center justify-center rounded-lg bg-${color}-600 text-white`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className={`font-semibold text-${color}-900 break-all`}>{value}</p>
        </div>
    </div>
);

const Stat = ({ icon, value, label, color }) => (
    <div className={`text-center p-4 rounded-lg bg-${color}-50 hover:shadow transition`}>
        <div className={`text-${color}-600 mx-auto mb-2`}>{icon}</div>
        <p className={`text-xl font-bold text-${color}-900`}>{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
    </div>
);

export default BioDashboard;
