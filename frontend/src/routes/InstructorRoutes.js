import { Routes, Route } from 'react-router-dom';
import InstructorDashboard from '../pages/instructor/InstructorDashboard';
import CoursePage from '../pages/instructor/CoursePage';
import LessonPage from '../pages/instructor/LessonPage'

const InstructorRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<InstructorDashboard />} />
      <Route path="/course/:id" element={<CoursePage />} />
      <Route path="/course/:id/lessons/:lessonId" element={<LessonPage/>} />
    </Routes>
  );
};

export default InstructorRoutes;
