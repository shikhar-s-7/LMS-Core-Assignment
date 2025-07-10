import { Routes, Route } from 'react-router-dom';
import InstructorDashboard from '../pages/dashboards/InstructorDashboard';

const InstructorRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<InstructorDashboard />} />
      
    </Routes>
  );
};

export default InstructorRoutes;
