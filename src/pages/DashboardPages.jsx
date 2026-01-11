import MainLayout from '../layout/MainLayout';
import BioDashboard from '../components/bioDashboard';

const DashboardPage = () => {
  return (
    <MainLayout>
      <div className="mt-5">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Dashboard / Halaman Utama
        </h2>
        <BioDashboard />
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
