const LessonCard = ({ lesson }) => {
    return (
        <div>
            <h3>Lesson {lesson.order}: {lesson.title}</h3>
            <p>Video: {lesson.videoUrl}</p>
            <p>Resources: {lesson.resources}</p>
        </div>
    );
};

export default LessonCard;