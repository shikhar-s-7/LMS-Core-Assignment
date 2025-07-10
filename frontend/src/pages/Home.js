import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';


const Home = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleDashboardRedirect = () => {
    if (user && user.role) {
        console.log('Redirecting to dashboard of role:', user.role);
        navigate(`/${user.role}/dashboard`);
    } else {
        console.warn('User or role missing:', user);
    }
    };

    return (
    <div className="home">
        <h1>Home</h1>
        {user && (
        <button className="dashboard-btn" onClick={handleDashboardRedirect}>
            Go to Dashboard
        </button>
    )}
    </div>
    );
};

export default Home;
