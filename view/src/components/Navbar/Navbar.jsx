import { useState } from 'react'
/* eslint-disable react/prop-types */
import { BsFillCalendarFill } from "react-icons/bs"
import { useDate } from "../../Hooks/useDate"
import { Link } from "react-router-dom"
import { MdEmail, MdNotifications, MdOutlineMenu } from "react-icons/md"
import { IoLanguage } from "react-icons/io5";

import "./navbar.css"
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import MobileSidebar from "../sidebar/MobileSidebar";

const Navbar = () => {
  const date = useDate()
  const { state } = useContext(UserContext)
  const [show, setShow] = useState(false)
  return (
    <div className={`sticky top-0 backdrop-blur-md z-50 ${state.theme === "light" ? "bg-white" :"bg-slate-800"}`}>
      {show && <MobileSidebar setShow={setShow} />}
      <div className={`w-full py-2 mb-3 md:mb-0 md:py-4 flex items-center md:px-4 pr-1 md:flex-row border-b`}>
        <div className="w-3/12 hidden lg:flex items-center gap-3">
          <span className={`flex gap-2 text-sm items-center font-medium  ${state.theme === "light" ? "text-gray-800" : "text-gray-300"}`}>
            <BsFillCalendarFill className="text-[#AA77FF]" size={14} />

            {`${date.currentWeekDay}, ${date.todayDate} ${date.currentMonthName} ${date.currentYear}`}
          </span>
        </div>
        <div className="w-5/12 md:hidden flex items-center gap-3 px-2">
          <span onClick={() => setShow(!show)}>
            <MdOutlineMenu size={30} className="text-[#AA77FF]-500" />
          </span>
        </div>
        <div className="navbar_container_1">
          {/* <div className="search_bar_1">
            <input
              type="text"
              className={`search_bar_input ${
                theme === "light" ? "bg-white" : "bg-slate-600 text-white"
              }`}
              placeholder="Search By Brand PSN, Title or SKU ID"
            />
            <span className="absolute top-1/2 right-1 -translate-y-1/2 bg-[#AA77FF]-500 text-white p-2 hover:bg-[#AA77FF]-400 cursor-pointer rounded-full">
              <BsSearch />
            </span>
          </div> */}
          <div className="nav_bar_links_1 relative">
           
            {/* Language */}
            
              <button className=" text-slate-500 cursor-pointer relative flex items-center justify-center" title="Language" aria-label="Language">
              <IoLanguage />
            </button>
            {/* chats */}
            
              <Link to={"/"} className=" text-slate-500 cursor-pointer relative flex items-center justify-center" title="Chats" aria-label="Chats">
              <MdEmail size={20} />
              </Link>
           

            {/* notification */}

            
              <Link to={"/"} className=" text-slate-500 cursor-pointer relative flex items-center justify-center" title="Notification" aria-label="Notification">
                <MdNotifications size={20}/>
              </Link>
            

            {/* Settings */}
            {/* <span className="bg-[#AA77FF]-500 rounded text-white cursor-pointer h-8 w-8 hidden md:flex items-center justify-center" onClick={(e) => settingHandler(e)}>
              <AiOutlineSetting className="text-sm md:text-lg" />
            </span>
            <SettingDrawer setMyTheme={theme} open={openRightDrawer} setOpenRightDrawer={setOpenRightDrawer} /> */}

            {/* User profile & dropdown */}
            <div className="h-fit flex items-center gap-3 overflow-hidden cursor-pointer" id="profile_dropdown">
              <img src="https://res.cloudinary.com/djbhdmm0r/image/upload/v1713589738/user1_z4mrnt.svg" alt="user Profile" className="h-10 w-10 rounded-full border" id="profile_dropdown" />
              <span className=" flex-col hidden md:flex" id="profile_dropdown">
                <span className={`${state.theme === "light" ? "text-gray-900" : "text-white"} text-sm font-medium`} id="profile_dropdown">
                  Suraj Aswal
                </span>
                <span className={`text-[12px] ${state.theme === "light" ? "text-gray-500" : "text-gray-400"}`} id="profile_dropdown">
                  Admin
                </span>
              </span>
              {/* <div className="h-full p-1 py-2" id="profile_dropdown">
                <BsThreeDotsVertical id="profile_dropdown" onClick={() => setIsProfileDropDown(!isProfileDropDown)} size={18} />
              </div>

              <div className={`absolute flex-col bg-gray-800 top-[100%] right-0 mt-3 z-50 ${isProfileDropDown ? "flex" : "hidden"}`} id="profile_dropdown">
                <Link to={"profile"} className="p-2 w-[140px] hover:bg-[#AA77FF]-400 hover:text-white text-white flex items-center gap-2">
                  <BiSolidUserDetail />
                  Profile
                </Link>
                <span className="p-2 w-[140px] hover:bg-[#AA77FF]-400 hover:text-white text-white flex md:hidden items-center gap-2" onClick={(e) => settingHandler(e)}>
                  <MdSettings />
                  Settings
                </span>
                <Link
                  onClick={() => {
                    dispatch(logoutUser())
                    dispatch(logoutTicketUser())
                    dispatch(resetProductOnLogout())
                    dispatch(resetCustomerOnLogout())
                    dispatch(resetSellerOnLogout())
                    dispatch(resetUtilityOnLogout())
                  }}
                  className="p-2 w-[140px] hover:bg-red-400 hover:text-white text-white flex items-center gap-2"
                >
                  <BiLogOut />
                  Logout
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
