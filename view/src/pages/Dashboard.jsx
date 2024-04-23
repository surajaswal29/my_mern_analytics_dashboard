// icons
import { GrGroup } from "react-icons/gr"
import { LuPackageCheck } from "react-icons/lu"
import { BiSolidShoppingBags } from "react-icons/bi"
import { FaEarthAsia } from "react-icons/fa6"
// import { TbFilter } from "react-icons/tb";
import { useContext, useEffect, useState } from "react"
import IntensityGraph from "../components/IntensityGraph"
import PiechartPESTLE from "../components/PiechartPESTLE"
import CountryGraph from "../components/CountryGraph"
import DonutRegion from "../components/DonutRegion"
import { UserContext } from "../context/userContext"
import { fetchDashboardData, fetchUserData } from "../api/userAPI"
import { SECTOR_FILTER_VALUES } from "../utils/constants"
import { IoSearch } from "react-icons/io5"
import { MdClose } from "react-icons/md"

const Dashboard = () => {
  const { state, dispatch } = useContext(UserContext)
  const [sectorFilter, setSectorFilter] = useState("")
  const [countryFilter, setCountryFilter] = useState("")
  const [countryFilterTerm, setCountryFilterTerm] = useState("")
  const [end_year, setEndYear] = useState("")
  const [endYearFilterTerm, setEndYearFilterTerm] = useState("")

  console.log(window.location.origin);

  const fetchUser = async (d) => {
    const { data } = await fetchUserData(d);

    dispatch({
      type: "SET_INIT_DATA",
      payload: data
    })
  }

  const fetchData = async (d) => {
    //console.log("called")
    const { data } = await fetchDashboardData(d)

    dispatch({
      type: "SET_DASHBOARD_ANALYTICS",
      payload: data,
    })
  }

  const handleSectorFilter = (e) => {
    const { value } = e.target
    setSectorFilter(value)

    fetchData({
      end_year: end_year || "",
      country: countryFilter || "",
      sector: value,
    })

    fetchUser({
      end_year: end_year || "",
      country: countryFilter || "",
      sector: value,
    })
  }

  const handleCountryFilter = () => {
    if (countryFilter.length > 2) {
      setCountryFilterTerm(countryFilter)
      fetchData({
        end_year: end_year || "",
        country: countryFilter || "",
        sector: sectorFilter || "",
      })
      fetchUser({
        end_year: end_year || "",
        country: countryFilter || "",
        sector: sectorFilter || "",
      })
    }
  }

  const handleEndYear = () => {
    if (end_year.length > 2) {
      setEndYearFilterTerm(end_year)
      fetchData({
        end_year: end_year || "",
        country: countryFilter || "",
        sector: sectorFilter || "",
      })
      fetchUser({
        end_year: end_year || "",
        country: countryFilter || "",
        sector: sectorFilter || "",
      })
    }
  }

  const handleResetYear = () => {
    setEndYear("")
    fetchData({
      end_year: "",
      country: countryFilter || "",
      sector: sectorFilter || "",
    })
    fetchUser({
      end_year: "",
      country: countryFilter || "",
      sector: sectorFilter || "",
    })
    setEndYearFilterTerm("")
  }
  const handleResetCountry = () => {
    setCountryFilter("")
    fetchData({
      end_year: end_year || "",
      country: "",
      sector: sectorFilter || "",
    })
    fetchUser({
      end_year: end_year || "",
      country: "",
      sector: sectorFilter || "",
    })
    setCountryFilterTerm("")
  }

  useEffect(() => {
    //console.log("Called here")
    fetchData()
    fetchUser()
  }, [])

  return (
    <div className='w-full h-full pb-16'>
      <div className='w-full p-3 md:py-4 md:p-8 h-full overflow-auto'>
        <div className='w-full flex justify-end flex-wrap py-3 gap-4 text-sm'>
          <div className={`top_filter_all ${state.theme === "light" ? "top_filter_light" : "top_filter_dark"}`}>
            <label className='bg-slate-800 text-white h-full flex items-center p-2'>
              End Year
            </label>
            <input
              type='text'
              name='end_year'
              id='end_year'
              value={end_year}
              onChange={(e) => setEndYear(e.target.value)}
              className='bg-inherit w-full md:w-auto h-full focus:outline-none outline-none text-sm cursor-pointer'
            />
            {endYearFilterTerm && endYearFilterTerm !== "" ? (
              <button
                className='text-red-500 px-2 py-1 rounded-md'
                onClick={handleResetYear}
              >
                <MdClose size={18} />
              </button>
            ) : (
              <button
                className={`${state.theme === 'light' ? 'text-purple-500' : ''}  px-2 py-1 rounded-md`}
                onClick={handleEndYear}
              >
                <IoSearch size={18} />
              </button>
            )}
          </div>
          <div className={`top_filter_all ${state.theme === "light" ? "top_filter_light" : "top_filter_dark"}`}>
            <label className='bg-slate-800 text-white h-full flex items-center p-2'>
              Sector
            </label>
            <select
              name='sector'
              id='sector'
              value={sectorFilter}
              onChange={handleSectorFilter}
              className='bg-inherit h-full w-full md:w-auto focus:outline-none outline-none text-sm cursor-pointer'
            >
              <option value='all'>All</option>
              {SECTOR_FILTER_VALUES.map((i, index) => (
                <option key={index} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div className={`top_filter_all ${state.theme === "light" ? "top_filter_light" : "top_filter_dark"}`}>
            <label className='bg-slate-800 text-white h-full flex items-center p-2'>
              Country
            </label>
            <input
              type='text'
              name='country'
              id='country'
              value={countryFilter}
              className='bg-inherit h-full w-full md:w-auto focus:outline-none outline-none text-sm cursor-pointer'
              onChange={(e) => setCountryFilter(e.target.value)}
            />
            {countryFilterTerm && countryFilterTerm !== "" ? (
              <button
                className='text-red-500 px-2 py-1 rounded-md'
                onClick={handleResetCountry}
              >
                <MdClose size={18} />
              </button>
            ) : (
              <button
                className={`${state.theme === 'light' ? 'text-purple-500' : ''}  px-2 py-1 rounded-md`}
                onClick={handleCountryFilter}
              >
                <IoSearch size={18} />
              </button>
            )}
          </div>
        </div>
        <div className='w-full flex gap-3 flex-col md:flex-row mb-6 mt-3'>
          {state &&
            state?.dashboardData &&
            state?.dashboardData.map((i, index) => (
              <div
                key={index}
                className={`w-full md:w-auto md:flex-1 rounded-md shadow border-gray-300  h-24 ${state.theme === "light" ? "bg-white" : "bg-slate-800"} flex items-center relative overflow-hidden`}
              >
                <div className='h-full w-fit px-6 flex items-center justify-center bg-[#AA77FF] text-white'>
                  {i.id === 1 && <LuPackageCheck size={35} />}
                  {i.id === 2 && <BiSolidShoppingBags size={35} />}
                  {i.id === 3 && <GrGroup size={35} />}
                  {i.id === 4 && <FaEarthAsia size={35} />}
                </div>
                <div className='w-fit p-3'>
                  <p className={`text-xl font-normal ${state.theme === "light" ? "text-gray-800" : "text-gray-50"}`}>{i.title}</p>
                  <p className={`text-lg font-medium ${state.theme === "light" ? "text-gray-700" : "text-gray-200"}`}>{i.value}</p>
                </div>
              </div>
            ))}
        </div>

        <div className='w-full lg:h-[450px] flex-col lg:flex-row mt-8 flex gap-6'>
          <div className={`w-full lg:w-7/12 ${state.theme === "light" ? "bg-white text-black" : "bg-slate-800 text-white"} rounded-xl border border-[#e5d3ff] p-3 shadow-md`}>
            <h1 className={`font-semibold text-lg`}>Intensity</h1>
            <p className={`${state.theme === "light" ? "text-gray-500" : "text-gray-200"} text-sm`}>
              Intensity Of Insights Based On End Year
            </p>
            <IntensityGraph />
          </div>
          <div className={`w-full lg:w-5/12 ${state.theme === "light" ? "bg-white text-black" : "bg-slate-800 text-white"} rounded-xl border border-[#e5d3ff] p-3 shadow-md`}>
            <h1 className='font-semibold text-lg'>PESTLE</h1>
            <p className={`${state.theme === "light" ? "text-gray-500" : "text-gray-200"} text-sm`}>
              Political, Economic, Social, Technological, Legal, and
              Environmental factors that may influence the insight
            </p>
            <div className='w-full mt-3'>
              <PiechartPESTLE />
            </div>
          </div>
        </div>
        <div className='w-full flex mt-6 flex-col lg:flex-row lg:h-[450px] gap-6'>
          <div className={`w-full lg:w-6/12 p-6 ${state.theme === "light" ? "bg-white text-black" : "bg-slate-800 text-white"} rounded-lg border border-[#e5d3ff] shadow-md`}>
            <h1 className='font-semibold text-lg'>Country</h1>
            <p className={`${state.theme === "light" ? "text-gray-500" : "text-gray-200"} text-sm`}>
              Country Associated With The Insight
            </p>
            <CountryGraph />
          </div>
          <div className={`w-full lg:w-6/12 p-6 ${state.theme === "light" ? "bg-white text-black" : "bg-slate-800 text-white"} rounded-lg border border-[#e5d3ff] shadow-md`}>
            <h1 className='font-semibold text-lg'>Region</h1>
            <p className={`${state.theme === "light" ? "text-gray-500" : "text-gray-200"} text-sm`}>
              Region Associated With The Insight
            </p>
            <DonutRegion />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
