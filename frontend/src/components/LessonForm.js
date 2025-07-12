import { useState } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
import { useAuthContext } from '../hooks/useAuthContext'

const LessonForm = ({courseId}) => {
    const {dispatch} = useCoursesContext()
    const { user} = useAuthContext()

    const [title, setTitle] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [order, setOrder] = useState('')
    const [resources, setResources] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const lesson = {title, videoUrl, order:Number(order),resources,course:courseId}

        const response = await fetch(`/api/courses/course/${courseId}/lessons`, {
        method: 'POST',
        body: JSON.stringify(lesson),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setVideoUrl('')
            setOrder('')
            setResources('')
            setError(null)
            setEmptyFields([])
            dispatch({type: 'CREATE_LESSON', payload: json})
        }
    }

    return (
        <form className="create-lesson" onSubmit={handleSubmit}>
        <h3>Add a New lesson</h3>

        <label>Lesson Title: </label>
        <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
        />

        <label>Video Url :</label>
        <input 
            type="text"
            onChange={(e) => setVideoUrl(e.target.value)}
            value={videoUrl}
            placeholder="https://example.com/video.mp4"
            className={emptyFields.includes('videoUrl') ? 'error' : ''}
        />

        <label>Resources:</label>
        <textarea 
            onChange={(e) => setResources(e.target.value)}
            value={resources}
            placeholder="additional resources, links, or notes"
        />

        <label >Lesson order: </label>
        <input 
            type="number"
            onChange={(e) => setOrder(e.target.value)}
            value={order}
            min="1"
            placeholder="1"
            className={emptyFields.includes('order') ? 'error' : ''}
        />

        <button>Add lesson</button>
        {error && <div className="error">{error}</div>}
        </form>
    )
}

export default LessonForm