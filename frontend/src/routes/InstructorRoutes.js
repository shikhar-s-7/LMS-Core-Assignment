import { Routes, Route } from 'react-router-dom';
import InstructorDashboard from '../pages/instructor/InstructorDashboard';
import CoursePage from '../pages/instructor/CoursePage';

const InstructorRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<InstructorDashboard />} />
      <Route path="/course/:id" element={<CoursePage />} />
    </Routes>
  );
};

export default InstructorRoutes;
