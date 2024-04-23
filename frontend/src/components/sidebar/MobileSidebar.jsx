import { createPortal } from "react-dom"
import { NavLink } from "react-router-dom"
import { MdInventory, MdDashboardCustomize, MdInsights } from "react-icons/md"
import { LiaCogSolid } from "react-icons/lia"
import { RxDashboard } from "react-icons/rx"
import { useRef } from "react"

const MobileSidebar = ({setShow}) => {
  const mainRef = useRef(null)

  const handleClose = () => {
    setShow(false)
   }

  const handleOutsideClick = () => { 
    if (mainRef.current) {
      handleClose()
    }
  }
  
  return createPortal(
    <div className="w-full h-full bg-black/75 absolute z-50 top-0 left-0" ref={mainRef} onClick={handleOutsideClick}>
      <div className='w-1/2 h-full bg-slate-900 py-4 text-gray-200' onClick={(e)=> e.stopPropagation()}>
        <div className='w-full flex justify-center px-4'>
          <h1 className='font-semibold text-xl flex items-center gap-2 whitespace-nowrap'>
            <RxDashboard /> My Dashboard
          </h1>
        </div>
        <div className='w-full mt-6'>
          <NavLink
            to={"/dashboard/main"}
            onClick={handleClose}
            className={({ isActive }) =>
              isActive ? `nav_link_style bg-[#a06bf5]` : `nav_link_style`
            }
          >
            <MdDashboardCustomize />
            Dashboard
          </NavLink>
          <NavLink
            to={"/dashboard/topics"}
            onClick={handleClose}
            className={({ isActive }) =>
              isActive ? `nav_link_style bg-[#a06bf5]` : `nav_link_style`
            }
          >
            <MdInventory />
            Topics
          </NavLink>
          <NavLink
            to={"/dashboard/all-insights"}
            onClick={handleClose}
            className={({ isActive }) =>
              isActive ? `nav_link_style bg-[#a06bf5]` : `nav_link_style`
            }
          >
            <MdInsights />
            All Insight
          </NavLink>
          <NavLink
            to={"/dashboard/settings"}
            onClick={handleClose}
            className={({ isActive }) =>
              isActive ? `nav_link_style bg-[#a06bf5]` : `nav_link_style`
            }
          >
            <LiaCogSolid />
            Settings
          </NavLink>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default MobileSidebar
