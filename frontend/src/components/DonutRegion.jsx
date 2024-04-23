import { useContext } from "react"
import Chart from "react-apexcharts"
import { UserContext } from "../context/userContext"

const DonutRegion = () => {
    const { state } = useContext(UserContext)

    let regionSet = new Set()

    state.userData &&
        state.userData.forEach((item) => {
            if (!regionSet.has(item.region)) {
                regionSet.add(item.region)
            }
        })

    const donutLabel = [...regionSet].map((item) => (item !== "" ? item : "None"))

    //console.log(donutLabel)

    const pieSeries = [...regionSet].map((item) => {
        return state.userData && state.userData.filter((data) => data.region === item).length
    })

    const options = {
        labels: donutLabel,
        dataLabels: {
            enabled: true,
            style: {
                fontSize: "12px",
                fontWeight: "bold",
            },
        },
        legend: {
            show: true,
        },
        stroke: {
            show: false,
            width: 0,
            colors: ["transparent"],
        },
        // colors: ["#AA77FF", "#FFAA77", "#77FFAA", "#77AAAA", "#AAAA77", "#FF77AA", "#AAAAFF", "#AAFF77", "#FFAAFF"],
    }

    return <Chart type='donut' options={options} series={pieSeries} height={"100%"} />
}

export default DonutRegion
