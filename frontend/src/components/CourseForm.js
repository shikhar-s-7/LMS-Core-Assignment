import { useState } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
import { useAuthContext } from '../hooks/useAuthContext'

const CourseForm = () => {
    const {dispatch} = useCoursesContext()
    const { user} = useAuthContext()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const course = {title, description, status}

        const response = await fetch('/api/courses', {
        method: 'POST',
        body: JSON.stringify(course),
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
            setDescription('')
            setStatus('')
            setError(null)
            setEmptyFields([])
            dispatch({type: 'CREATE_COURSE', payload: json})
        }
    }

    return (
        <form className="create-course" onSubmit={handleSubmit}>
        <h3>Add a New course</h3>

        <label>Course Title:</label>
        <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
        />

        <label>Description :</label>
        <input 
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={emptyFields.includes('description') ? 'error' : ''}
        />

        <label>Status:</label>
        <select 
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            className={emptyFields.includes('status') ? 'error' : ''}
        >
            <option value=""> Select Status </option>
            <option value="notStarted">Not Started</option>
            <option value="started">Started</option>
        </select>

        <button>Add course</button>
        {error && <div className="error">{error}</div>}
        </form>
    )
}

export default CourseForm