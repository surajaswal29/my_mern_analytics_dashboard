import { useContext, useEffect, useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table"
import { UserContext } from "../context/userContext"
import { Link } from "react-router-dom"
import { fetchAllInsightData } from "../api/userAPI"
import { Pagination } from "@mui/material"
import { MdClose } from "react-icons/md"
import { SECTOR_FILTER_VALUES } from "../utils/constants"
import { IoSearch } from "react-icons/io5"

const DataTable = () => {
  const { state, dispatch } = useContext(UserContext)
  const [sectorFilter, setSectorFilter] = useState("")
  const [topicFilter, setTopicFilter] = useState("")
  const [topicFilterTerm, setTopicFilterTerm] = useState("")
  const [insightFilter, setInsightFilter] = useState("")
  const [insightFilterTerm, setInsightFilterTerm] = useState("")
  const [end_year, setEndYear] = useState("")
  const [endYearFilterTerm, setEndYearFilterTerm] = useState("")

  const columns = [
    {
      accessorKey: "insight",
      header: "Insight",
      size: 250,
    },
    {
      accessorKey: "title",
      header: "Title",
      size: 250,
      enableSorting: false,
    },
    {
      accessorKey: "sector",
      header: "Sector",
      enableSorting: false,
      size: 150,
    },
    {
      accessorKey: "topic",
      header: "Topic",
      size: 150,
    },
    {
      accessorKey: "end_year",
      header: "End Year",
      size: 100,
    },
    {
      accessorKey: "url",
      header: "URL",
      size: 150,
      cell: (info) => (
        <Link to={info.getValue()}>
          Link
        </Link>
      )
    },
  ]

  const table = useReactTable({
    data: state.insightData || [],
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const fetchData = async (page, d) => {
    const result = await fetchAllInsightData(page, 20, d)
    // //console.log(result.data)
    dispatch({
      type: "SET_INSIGHT_DATA",
      payload: {
        data: result.data,
        currentPage: result.currentPage,
        pageLimit: result.pageLimit,
        totalItems: result.totalItems,
        totalPages: result.totalPages
      }
    })
  };

  useEffect(() => {
    fetchData(1)
  }, [])

  const handlePageChange = (event, value) => {
    fetchData(value, {
      end_year: end_year || "",
      topic: topicFilter || "",
      insight: insightFilter || "",
      sector: sectorFilter || "",
    })
  }

  const handleSectorFilter = (e) => {
    const { value } = e.target
    setSectorFilter(value)

    fetchData(1, {
      end_year: end_year || "",
      topic: topicFilter || "",
      insight: insightFilter || "",
      sector: value,
    })

  }

  const handleTopicFilter = () => {
    if (topicFilter.length > 2) {
      setTopicFilterTerm(topicFilter)
      fetchData(1, {
        end_year: end_year || "",
        topic: topicFilter || "",
        insight: insightFilter || "",
        sector: sectorFilter || "",
      })

    }
  }

  // insight filter
  const handleInsightFilter = () => {
    if (insightFilter.length > 2) {
      setInsightFilterTerm(insightFilter)
      fetchData(1, {
        end_year: end_year || "",
        topic: topicFilter || "",
        insight: insightFilter || "",
        sector: sectorFilter || "",
      })

    }
  }

  const handleEndYear = () => {
    if (end_year.length > 2) {
      setEndYearFilterTerm(end_year)
      fetchData(1, {
        end_year: end_year || "",
        topic: topicFilter || "",
        insight: insightFilter || "",
        sector: sectorFilter || "",
      })

    }
  }

  const handleResetYear = () => {
    setEndYear("")
    fetchData(1, {
      end_year: "",
      topic: topicFilter || "",
      insight: insightFilter || "",
      sector: sectorFilter || "",
    })

    setEndYearFilterTerm("")
  }

  const handleResetTopic = () => {
    setTopicFilter("")
    fetchData(1, {
      end_year: end_year || "",
      topic: "",
      insight: insightFilter || "",
      sector: sectorFilter || "",
    })

    setTopicFilterTerm("")
  }

  const handleResetInsight = () => {
    setInsightFilter("")
    fetchData(1, {
      end_year: end_year || "",
      topic: topicFilter || "",
      insight: "",
      sector: sectorFilter || "",
    })

    setInsightFilterTerm("")
  }

  return (
    <>
      <div className='w-full flex flex-wrap justify-end py-3 gap-4 text-sm'>
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
            className='bg-inherit h-full w-full focus:outline-none outline-none text-sm cursor-pointer'
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
            className='bg-inherit h-full w-full focus:outline-none outline-none text-sm cursor-pointer'
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
            Topic
          </label>
          <input
            type='text'
            name='topic'
            id='topic'
            value={topicFilter}
            className='bg-inherit h-full w-full focus:outline-none outline-none text-sm cursor-pointer'
            onChange={(e) => setTopicFilter(e.target.value)}
          />
          {topicFilterTerm && topicFilterTerm !== "" ? (
            <button
              className='text-red-500 px-2 py-1 rounded-md'
              onClick={handleResetTopic}
            >
              <MdClose size={18} />
            </button>
          ) : (
            <button
              className={`${state.theme === 'light' ? 'text-purple-500' : ''}  px-2 py-1 rounded-md`}
              onClick={handleTopicFilter}
            >
              <IoSearch size={18} />
            </button>
          )}
        </div>
        <div className={`top_filter_all ${state.theme === "light" ? "top_filter_light" : "top_filter_dark"}`}>
          <label className='bg-slate-800 text-white h-full flex items-center p-2'>
            Insight
          </label>
          <input
            type='text'
            name='Insight'
            id='Insight'
            value={insightFilter}
            className='bg-inherit h-full w-full focus:outline-none outline-none text-sm cursor-pointer'
            onChange={(e) => setInsightFilter(e.target.value)}
          />
          {insightFilterTerm && insightFilterTerm !== "" ? (
            <button
              className='text-red-500 px-2 py-1 rounded-md'
              onClick={handleResetInsight}
            >
              <MdClose size={18} />
            </button>
          ) : (
            <button
              className={`${state.theme === 'light' ? 'text-purple-500' : ''}  px-2 py-1 rounded-md`}
              onClick={handleInsightFilter}
            >
              <IoSearch size={18} />
            </button>
          )}
        </div>

      </div>
      <div className="w-full bg-purple-200 p-3 rounded-lg my-3">
        <h1 className="text-lg font-semibold">All Insights</h1>
      </div>
      <div className='w-full rounded-md border-x border-slate-300 overflow-auto'>
        <table className={`w-full border-0 border-collapse ${state.theme === "light" ? "bg-white text-black" : "bg-slate-700 text-white"} text-sm`}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className='border border-slate-500 bg-slate-800 text-white'
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`whitespace-nowrap text-left p-3 font-medium`}
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center gap-1"
                            : "flex items-center gap-1"
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-slate-300 cursor-pointer ${state.theme === "light" ? "hover:bg-purple-50" : "hover:bg-purple-400"} ease-in-out duration-200`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`p-3 truncate`}
                    style={{
                      maxWidth: cell.column.getSize(),
                    }}
                  >
                    {cell.column.id === "description"
                      ? flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )
                      : flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full mt-3 p-3">
        <Pagination count={state.totalPages ? state.totalPages : 0} variant="outlined" shape="rounded" page={state.currentPage ? state.currentPage : 0} onChange={handlePageChange} />
      </div>
      <div className='w-full'>
        {state.loading && (
          <div className='grid grid-cols-4 gap-2 bg-white p-2 rounded-md'>
            <div className='bg-gray-200 animate-pulse p-6'></div>
            <div className='bg-gray-200 animate-pulse p-6'></div>
            <div className='bg-gray-200 animate-pulse p-6'></div>
            <div className='bg-gray-200 animate-pulse p-6'></div>
          </div>
        )}
      </div>

      {!state.insightData && (
        <div className='w-full rounded-xl border border-dashed border-slate-300 p-4'>
          <h1>No Data Available</h1>
        </div>
      )}
    </>
  )
}

export default DataTable
