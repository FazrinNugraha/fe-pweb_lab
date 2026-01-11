import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPages';
import InputPage from './pages/InputPages';
import TampilkanPage from './pages/TampilkanPages';
import DetailMahasiswa from './components/detailMahasiswa';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/tampilkan" element={<TampilkanPage />} />
        <Route path="/mahasiswa/:id" element={<DetailMahasiswa />} />
      </Routes>
    </Router>
  );
}

export default App;
