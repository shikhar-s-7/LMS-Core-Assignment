import { useCoursesContext } from "../hooks/useCoursesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({course}) => {
    const {dispatch}=useCoursesContext();
    const {user}=useAuthContext();
    const navigate=useNavigate();

    const handleDelete=async (e) => {
        e.stopPropagation();
        if(!user)
            return
        const response= await fetch('/api/courses/'+course._id,{
            method: "DELETE",
            headers:{
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json= await response.json();
        if(response.ok)
        {
            console.log("Deleted course:", json);
            dispatch({type:"DELETE_COURSE",payload:json})
        }
    }

    const handleCardClick = () => {
        navigate(`/instructor/course/${course._id}`);
    }
    
    return ( 
        <div className="course-card" onClick={handleCardClick}>
            <h2>{course.title}</h2>
            <p><strong>Description: </strong>{course.description}</p>
            <p><strong>Status: </strong>{course.status}</p>
            <p>{formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}</p>
            <button onClick={handleDelete} className="delete-btn">
                Delete
            </button>

        </div> 
    );
}

export default CourseCard;