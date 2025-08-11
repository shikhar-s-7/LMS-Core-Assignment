import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const LessonCard = ({ lesson,courseId }) => {
    const { user } = useAuthContext();

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <Link to={`/${user.role}/course/${courseId}/lessons/${lesson._id}`} className="lesson-card-link">
            <div>
                <h3>Lesson {lesson.order}: {lesson.title}</h3>
                <p>Video: {lesson.videoUrl}</p>
                <p>Resources: {lesson.resources}</p>
            </div>
        </Link>
    );
};

export default LessonCard;