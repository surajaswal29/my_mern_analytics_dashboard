import { useContext } from "react"
import Chart from "react-apexcharts"
import { UserContext } from "../context/userContext"

const PiechartPESTLE = () => {
  const { state } = useContext(UserContext)

  let pestle = new Set()

  state.userData &&
    state.userData.forEach((item) => {
      if (!pestle.has(item.pestle)) {
        pestle.add(item.pestle)
      }
    })

  const pieLabel = [...pestle].map((item) => (item !== "" ? item : "None"))

  //console.log(pieLabel)

  const pieSeries = [...pestle].map((item) => {
    return state.userData && state.userData.filter((data) => data.pestle === item).length
  })

  const options = {
    labels: pieLabel,

    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontWeight: "bold",
        colors: ["#fff"],
      },
    },
    legend: {
      show: true,
    },
    stroke: {
      show: false,
      width: 0,
      colors: ["transparent"],
    }

  }

  return <Chart type='pie' options={options} series={pieSeries} />
}

export default PiechartPESTLE
