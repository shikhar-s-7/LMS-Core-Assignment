import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect} from "react";
import { useCoursesContext } from "../../hooks/useCoursesContext";
import CourseDetails from "../../components/CourseDetails";
import CourseForm from "../../components/CourseForm";

const InstructorDashboard = () => {
  const {user}=useAuthContext();
  const {courses,dispatch}=useCoursesContext();

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/courses', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_COURSES', payload: json})
      }
    }

    if (user) {
      fetchCourses()
    }
  }, [dispatch,user])
  
  return( 
  <div className="instructor-dashboard">
    <h2>My Courses</h2>
    <div className="courses">
      {courses && courses.map((course) => (
          <CourseDetails key={course._id} course={course} />
      ))}
    </div>
    <CourseForm/>
  </div> ) ;
};

export default InstructorDashboard;
