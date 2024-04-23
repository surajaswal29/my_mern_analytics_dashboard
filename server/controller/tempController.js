import tempModel from "../model/tempModel.js"

// get all data
export const getAllTempData = async (req, res, next) => {
  try {
    //console.log(req.body)
    //console.log(req.params)
    const reqBody = [
      "country",
      "end_year",
      "source",
      "pestle",
      "region",
      "sector",
    ]

    Object.keys(req.body).forEach((key) => {
      if (!reqBody.includes(key)) {
        return res.status(400).json({
          status: "failed",
          message:
            "Invalid filter applied. Valid filters are: country, end_year, source, pestle, region, sector",
        })
      }
    })

    const { end_year, sector, country } = req.body

    let filter = {}

    if (end_year && end_year !== "") {
      filter = {
        ...filter,
        end_year,
      }
    }
    if (sector && sector !== "" && sector !== "all") {
      filter = {
        ...filter,
        sector,
      }
    }
    if (country && country !== "") {
      filter = {
        ...filter,
        country,
      }
    }

    // let pageLimit = req.query.show ? parseInt(req.query.show, 10) : 20
    // let page = req.params.page ? parseInt(req.params.page, 10) : 1

    // if (page < 1) {
    //   return res.status(400).json({
    //     status: "failed",
    //     message: "Invalid page number",
    //   })
    // }

    const count = await tempModel.countDocuments(filter)
    // const totalPages = Math.ceil(count / pageLimit)

    // if (page > totalPages) {
    //   return res.status(404).json({
    //     status: "failed",
    //     message: "Page not found",
    //   })
    // }

    // let skip = (page - 1) * pageLimit //.skip(skip).limit(pageLimit)

    const response = await tempModel.find(filter)

    //console.log(response)

    if (!response || response.length <= 0) {
      return res.status(404).json({
        status: "failed",
        message: "No data found",
      })
    }

    res.status(200).json({
      status: "success",
      // pageLimit,
      totalItems: count,
      // currentPage: page,
      // totalPages,
      data: response,
    })
  } catch (error) {
    //console.log(error)
    res.status(500).json({
      status: "failed",
      message: "Server error",
    })
  }
}

// get all insight table data
export const getAllInsightData = async (req, res, next) => {
  try {
    const allowedFilters = [
      "country",
      "end_year",
      "source",
      "pestle",
      "region",
      "sector",
      "insight",
      "topic",
    ]

    // Check for any invalid filters
    const isInvalidFilter = Object.keys(req.body).some(
      (key) => !allowedFilters.includes(key)
    )
    if (isInvalidFilter) {
      return res.status(400).json({
        status: "failed",
        message:
          "Invalid filter applied. Valid filters are: " +
          allowedFilters.join(", "),
      })
    }

    const { end_year, sector, topic, insight } = req.body
    let filter = {}

    if (end_year && end_year !== "") {
      filter.end_year = end_year
    }
    if (sector && sector !== "all") {
      filter.sector = sector
    }
    if (topic) {
      filter.topic = topic
    }
    if (insight) {
      filter.insight = new RegExp(insight, "i")
    }

    console.log(filter);

    const pageLimit = req.query.show ? parseInt(req.query.show, 10) : 20
    const page = Math.max(
      1,
      req.params.page ? parseInt(req.params.page, 10) : 1
    )

    const count = await tempModel.countDocuments(filter)
    const totalPages = Math.ceil(count / pageLimit)

    if (totalPages > 0 && page > totalPages) {
      return res.status(404).json({
        status: "failed",
        message: "Page not found",
      })
    }

    const skip = (page - 1) * pageLimit
    const response = await tempModel.find(filter).skip(skip).limit(pageLimit)

    if (!response.length) {
      return res.status(404).json({
        status: "failed",
        message: "No data found",
      })
    }

    return res.status(200).json({
      status: "success",
      pageLimit,
      totalItems: count,
      currentPage: page,
      totalPages,
      data: response,
    })
  } catch (error) {
    console.error(error) // Log the error
    return res.status(500).json({
      status: "failed",
      message: "Server error",
    })
  }
}

// get dashboard analytics data
export const getDashboardData = async (req, res, next) => {
  try {
    const { end_year, sector, country } = req.body

    let filter = {}

    if (end_year && end_year !== "") {
      filter = {
        ...filter,
        end_year,
      }
    }
    if (sector && sector !== "" && sector !== "all") {
      filter = {
        ...filter,
        sector,
      }
    }
    if (country && country !== "") {
      filter = {
        ...filter,
        country,
      }
    }

    console.log(filter)

    const response = await tempModel.find(filter)

    // //console.log(response)

    let topicSet = new Set()
    let pestleSet = new Set()
    let sectorSet = new Set()
    let countrySet = new Set()

    response.forEach((item) => {
      if (item.topic !== "" && !topicSet.has(item)) topicSet.add(item.topic)
      if (item.pestle !== "" && !pestleSet.has(item)) pestleSet.add(item.pestle)
      if (item.sector !== "" && !sectorSet.has(item)) sectorSet.add(item.sector)
      if (item.country !== "" && !countrySet.has(item))
        countrySet.add(item.country)
    })

    return res.status(200).json({
      status: "success",
      data: [
        {
          id: 1,
          title: "Total Topics",
          value: [...topicSet].length,
          // icon: <LuPackageCheck size={35} />,
        },
        {
          id: 2,
          title: "Total PESTLE",
          value: [...pestleSet].length,
          // icon: <BiSolidShoppingBags size={35} />,
        },
        {
          id: 3,
          title: "Total Sector",
          value: [...sectorSet].length,
          // icon: <GrGroup size={35} />,
        },
        {
          id: 4,
          title: "Total Country",
          value: [...countrySet].length,
          // icon: <MdCurrencyRupee size={35} />,
        },
      ],
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      status: "failed",
      message: "Server error",
    })
  }
}
