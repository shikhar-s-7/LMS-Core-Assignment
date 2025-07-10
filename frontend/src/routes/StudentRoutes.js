import { Routes, Route } from 'react-router-dom';
import StudentDashboard from '../pages/dashboards/StudentDashboard';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<StudentDashboard />} />
    </Routes>
  );
};

export default StudentRoutes;
