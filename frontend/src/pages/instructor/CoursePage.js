import { useCoursesContext } from "../../hooks/useCoursesContext";
import { useEffect} from "react";
import { useParams } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";
import LessonForm from "../../components/LessonForm";
import LessonCard from "../../components/LessonCard";

const CoursePage = () => {
    const {user} =useAuthContext();
    const {courses,lessons,dispatch}=useCoursesContext();
    const {id}=useParams();

    useEffect(() => {
        const fetchCourse=async () => {
            const response=await fetch(`/api/courses/course/${id}`,{
                headers:{'Authorization':`Bearer ${user.token}`}
            })
            const json =await response.json();
            
            if(response.ok)
            {
                dispatch({type:"SET_COURSE",payload:json})
                dispatch({type: 'SET_LESSONS', payload: json.lessons});
            }
        }
        if( user && id)
        {
            fetchCourse();
        }
        return () => {
            dispatch({ type: 'CLEAR_LESSONS' });
            dispatch({ type: 'CLEAR_DOUBTS' }); 
        };
    }, [dispatch,user,id])

    //finding course
    const course = courses?.find(c => c._id === id);

    return ( 
    <div className="course-page">
            {
                course &&
                (
                    <div>
                        <h1>{course.title}</h1>
                        <p>{course.description}</p>
                        <p>{course.status}</p>
                    </div>
                )
            }
        <LessonForm courseId={id}/>
        <div className="lessons">
            <h2>Lessons</h2>
            {
                lessons && lessons.map((lesson) => (
                    <LessonCard key={lesson._id} lesson={lesson} courseId={id}/>
                ))
            }
        </div>

    </div> );
}

export default CoursePage;