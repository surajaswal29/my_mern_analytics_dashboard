import { createContext, useReducer } from "react";


export const UserContext = createContext(null)


let defaultTheme = localStorage.getItem('theme_dash') || 'light'
let defaultAuth = localStorage.getItem('isAuth_dash') || false

console.log({
    defaultTheme,
    defaultAuth
});

const initialState = {
    theme: defaultTheme,
    isAuth: defaultAuth,
    user: null,
    userData: null,
    dashboardData: null,
    insightData: null,
    currentPage: 0,
    pageLimit: 20,
    totalItems: 0,
    totalPages: 0,
}


const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                isAuth: action.payload.isAuth,
                user: action.payload.user
            }
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload
            }
        case 'SET_INIT_DATA':
            return {
                ...state,
                userData: action.payload
            }
        case 'SET_DASHBOARD_ANALYTICS':
            return {
                ...state,
                dashboardData: action.payload
            }
        case 'SET_INSIGHT_DATA':
            return {
                ...state,
                insightData: action.payload.data,
                currentPage: action.payload.currentPage,
                pageLimit: action.payload.pageLimit,
                totalItems: action.payload.totalItems,
                totalPages: action.payload.totalPages
            }
        default:
            return state
    }
}


// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    // const [userData, setUserData] = useState()
    const [state, dispatch] = useReducer(userReducer, initialState)
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}