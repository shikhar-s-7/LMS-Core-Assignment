import { createContext, useReducer } from 'react'

export const CoursesContext = createContext()

export const coursesReducer = (state, action) => {
    switch (action.type) {
    case 'SET_COURSES': 
    return {
        courses: action.payload
    }
    case 'SET_COURSE':
    return {
        ...state,
        courses: state.courses.map(course => 
            course._id === action.payload._id ? action.payload : course
        )
    }
    case 'CREATE_COURSE':
    return {
        courses: [action.payload, ...state.courses]
    }
    case 'DELETE_COURSE':
    return {
        courses: state.courses.filter((c) => c._id !== action.payload._id)
    }
    case 'SET_LESSONS':
    return {
        ...state,
        lessons: action.payload
    }
    case 'CREATE_LESSON':
        return {
            ...state,
            lessons: [...state.lessons, action.payload]
        }
    case 'DELETE_LESSON':
        return {
            ...state,
            lessons: state.lessons.filter((l) => l._id !== action.payload._id)
        }
    default:
        return state
    }
}

export const CoursesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(coursesReducer, {
        courses: [],
        lessons:[]
    })

    return (
        <CoursesContext.Provider value={{...state, dispatch}}>
            { children }
        </CoursesContext.Provider>
    )
}