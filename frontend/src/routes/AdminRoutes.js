import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/dashboards/AdminDashboard';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard />} />

    </Routes>
  );
};

export default AdminRoutes;
