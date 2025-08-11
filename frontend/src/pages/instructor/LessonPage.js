import { useCoursesContext } from "../../hooks/useCoursesContext";
import { useEffect,useState } from "react";
import { useParams } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";
import DoubtForm from "../../components/DoubtForm";
import Doubt from "../../components/Doubt";
import ReactPlayer from 'react-player';
import { buildDoubtsTree } from "../../utils/doubtTransformer";

const LessonPage = () => {
    const { user } = useAuthContext();
    const {doubts, dispatch } = useCoursesContext();
    const [lesson, setLesson] = useState(null); 
    const { id:courseId,lessonId } = useParams(); //this is lessonId
    const [doubtsTree, setDoubtsTree] = useState([]);

    useEffect(() => {
        const fetchLesson = async () => {
            const response = await fetch(`/api/courses/course/${courseId}/lessons/${lessonId}/doubts`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const json = await response.json();
            
            if (response.ok) {
                setLesson(json.lesson); 
                dispatch({ type: 'SET_DOUBTS', payload: json.doubts });
            }
        }
        if (user && lessonId) {
            fetchLesson();
        }
        return () => {
            dispatch({ type: 'CLEAR_DOUBTS' });
        };
    }, [dispatch, user, courseId,lessonId]);

    //running transformer whenever the global 'doubts' array changes
    useEffect(() => {
        if (doubts) {
            const tree = buildDoubtsTree(doubts);
            setDoubtsTree(tree);
        }
    }, [doubts]);

    const handleCreateDoubt=async(content,parentDoubtId)=>{
        const response= await fetch(`/api/courses/course/${courseId}/lessons/${lessonId}/doubts`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`,
            },
            body: JSON.stringify({ content, parentDoubt: parentDoubtId })
        });
        const newDoubt = await response.json();
        if (response.ok) {
            dispatch({ type: 'CREATE_DOUBT', payload: newDoubt });
        }
    }

    const handleDeleteDoubt = async (doubtId) => {
        const response = await fetch(`/api/courses/course/${courseId}/lessons/${lessonId}/doubts/${doubtId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if (response.ok) {
            dispatch({ type: 'DELETE_DOUBT', payload: { _id: doubtId } });
        }
    };

    const handleEditDoubt = async (doubtId, content) => {
        const response = await fetch(`/api/courses/course/${courseId}/lessons/${lessonId}/doubts/${doubtId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
            body: JSON.stringify({ content })
        });
        const updatedDoubt = await response.json();
        if (response.ok) {
            dispatch({ type: 'UPDATE_DOUBT', payload: updatedDoubt });
        }
    };

    return (
        <div className="lesson-page">
            {
                lesson?
                (
                    <div>
                        <h1>{lesson.title}</h1>
                        <p>{lesson.description}</p>
                        <ReactPlayer url={lesson.videoUrl} controls={true} />
                        <p>Resources: {lesson.resources}</p>
                    </div>
                ): (
                <p>Loading lesson...</p>
                )
            }
            <div className="doubt-section">
                <h2>Doubts</h2>
                <DoubtForm onPost={(content)=>{
                    handleCreateDoubt(content,null)
                }}></DoubtForm>
                {/* mapping over doubtsTree */}
                <div className="doubts-list">
                    {doubtsTree.map((doubt) => (
                        <Doubt 
                            key={doubt._id} 
                            doubt={doubt} 
                            handleCreateDoubt={handleCreateDoubt}
                            handleDeleteDoubt={handleDeleteDoubt}
                            handleEditDoubt={handleEditDoubt}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LessonPage;
