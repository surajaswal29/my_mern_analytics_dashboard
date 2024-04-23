import { useContext } from "react"
import { UserContext } from "../context/userContext"

const Settings = () => {
  const { state, dispatch } = useContext(UserContext)

  const handleTheme = (e) => {
    dispatch({ type: 'SET_THEME', payload: e.target.value })
    localStorage.setItem('theme_dash', e.target.value)
  }
  return (
    <div className='w-full p-8'>
      <div className="w-full">
        <h1 className={`text-lg font-medium ${state.theme === "light" ? "text-black":"text-white"}`}>Settings</h1>
      </div>
      <div className="w-full mt-3">
        <div className={`w-[350px] ${state.theme === "light" ? "bg-white text-black":"bg-slate-800 text-white"} rounded-lg p-3`}>
          <select name='theme' id='theme' value={state.theme || ""} className="w-full p-2 outline-none focus:outline-none border rounded-md cursor-pointer border-purple-300 bg-inherit" onChange={handleTheme}>
            <option value='light'>Light</option>
            <option value='dark'>Dark</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Settings
