import express from "express"
import {
  getAllTempData,
  getDashboardData,
  getAllInsightData,
} from "../controller/tempController.js"

const tempRouter = express.Router()

tempRouter.route("/get_temp_data").post(getAllTempData)
tempRouter.route("/get_dashboard_data").post(getDashboardData)
tempRouter.route("/get_all_insight_data/:page").post(getAllInsightData)

export default tempRouter
