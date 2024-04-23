import { useContext } from 'react'
import Chart from "react-apexcharts";
import { UserContext } from '../context/userContext';


const IntensityGraph = () => {

    const { state } = useContext(UserContext)
    //console.log(state.userData);

    let sector = new Set()
    state.userData && state.userData.forEach((item) => {
        if (!sector.has(item.sector)) {
            sector.add(item.sector)
        }
    })
    //console.log(sector);
    let end_year = new Set()

    state.userData && state.userData.forEach((item) => {
        if (!end_year.has(item.end_year)) {
            end_year.add(item.end_year)
        }
    })

    const endYearData = [...end_year].filter(i => i !== null).sort((a, b) => a - b)

    const intensityData = endYearData.map((item) => state.userData && state.userData
        .filter((data) => data.end_year === item)
        .reduce((a, c) => a + c.intensity, 0))

    const options = {
        chart: {
            id: "Intensity",
            toolbar: {
                show: false
            },
        },
        stroke: {
            curve: "smooth",
            width: 3,
            colors: ["#AA77FF"]
        },
        xaxis: {
            show: false,
            labels: {
                show: false
            },
            categories: endYearData,
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: state.theme === "light" ? "#000" : "#fff"
                }
            }
        }
    }

    const series = [
        {
            name: "Intensity",
            data: intensityData
        }
    ]
    return (
        <Chart
            options={options}
            series={series}
            type="line"
            width="100%"
            height="400px"
        />
    )
}

export default IntensityGraph
