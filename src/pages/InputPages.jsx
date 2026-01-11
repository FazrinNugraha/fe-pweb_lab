import MainLayout from '../layout/MainLayout';
import Form from '../components/Form'; // Pastikan nama filenya sesuai (Form.jsx)

const InputPage = () => {
  return (
    <MainLayout>
      <div className="mt-5">
        <h2 className="text-2xl font-bold text-center mb-4">Halaman Input Data</h2>
        <Form />
      </div>
    </MainLayout>
  );
};

export default InputPage;