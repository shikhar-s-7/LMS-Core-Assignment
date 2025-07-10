import { useCoursesContext } from "../hooks/useCoursesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const CourseDetails = ({course}) => {
    const {dispatch}=useCoursesContext();
    const {user}=useAuthContext();

    const handleClick=async () => {
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
    
    return ( 
        <div className="course-card">
            <h2>{course.title}</h2>
            <p><strong>Description: </strong>{course.description}</p>
            <p><strong>Status: </strong>{course.status}</p>
            <p>{formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}</p>
            <button onClick={handleClick} className="delete-btn">
                Delete
            </button>

        </div> 
    );
}

export default CourseDetails;