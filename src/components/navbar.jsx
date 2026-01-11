import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 p-4 text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                    🎓 Aplikasi Mahasiswa
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-6">
                    <li><Link to="/" className="hover:text-purple-300">Input Data</Link></li>
                    <li><Link to="/tampilkan" className="hover:text-purple-300">Tampilkan Data</Link></li>
                </ul>

                {/* Mobile Button */}
                <button className="md:hidden" onClick={() => setOpen(!open)}>
                    {open ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden mt-4 flex flex-col gap-3 text-center">
                    <Link to="/" onClick={() => setOpen(false)}>Input Data</Link>
                    <Link to="/tampilkan" onClick={() => setOpen(false)}>Tampilkan Data</Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
