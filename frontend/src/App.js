import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminRoutes from './routes/AdminRoutes';
import InstructorRoutes from './routes/InstructorRoutes';
import StudentRoutes from './routes/StudentRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/admin/*" 
              element={<AdminRoutes />} 
            />
            <Route 
              path="/instructor/*" 
              element={<InstructorRoutes />} 
            />
            <Route
              path="/student/*" 
              element={<StudentRoutes />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
