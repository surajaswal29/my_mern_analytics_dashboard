import { NavLink, useNavigate } from "react-router-dom"
import { MdInventory, MdDashboardCustomize, MdInsights, MdLogout } from "react-icons/md"
import { LiaCogSolid } from "react-icons/lia"
import { RxDashboard } from "react-icons/rx";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const Sidebar = () => {
  const { dispatch } = useContext(UserContext)
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAuth_dash");
    dispatch({
      type: "SET_USER",
      payload: {
        isAuth: false,
        user: null
      }
    })
    navigate("/");
  }
  return (
    <div className="w-full md:w-2/12 flex-col justify-between h-full bg-slate-900 py-4 text-gray-200 hidden md:flex">
      <div className="w-full">
        <div className="w-full flex justify-center px-4">
          <h1 className="font-semibold text-xl flex items-center gap-2"><RxDashboard /> My Dashboard</h1>
        </div>
        <div className="w-full mt-6">
          <NavLink to={"/dashboard/main"} className={({ isActive }) => isActive ? `nav_link_style bg-[#a06bf5]` : `nav_link_style`}>
            <MdDashboardCustomize />
            Dashboard
          </NavLink>
          <NavLink to={"/dashboard/topics"} className={({ isActive }) => isActive ? `nav_link_style bg-[#a06bf5]` : `nav_link_style`}>
            <MdInventory />
            Topics
          </NavLink>
          <NavLink to={"/dashboard/all-insights"} className={({ isActive }) => isActive ? `nav_link_style bg-[#a06bf5]` : `nav_link_style`}>
            <MdInsights />
            All Insight
          </NavLink>
          <NavLink to={"/dashboard/settings"} className={({ isActive }) => isActive ? `nav_link_style bg-[#a06bf5]` : `nav_link_style`}>
            <LiaCogSolid />
            Settings
          </NavLink>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button type="button" className="nav_link_style text-[#9d2d2d]" onClick={handleLogout}><MdLogout /> Logout</button>
      </div>
    </div>
  )
}

export default Sidebar
