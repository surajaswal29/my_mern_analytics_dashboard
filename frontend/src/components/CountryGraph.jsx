import { useContext, useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { UserContext } from '../context/userContext';

const CountryGraph = () => {
    const { state } = useContext(UserContext)

    const [data, setData] = useState([
        ["Country", "Name"],
    ])

    const options = {
        region: "world",
        colorAxis: {
            colors: ["#BEADFA", "#BEADFA"]
        },
        datalessRegionColor: "#FAF3F0",
        defaultColor: "#BEADFA",
        backgroundColor: state.theme === "dark" ? "#1E293B" : "#fff",
    }


    useEffect(() => {
        let countrySet = new Set();

        state.userData &&
            state.userData.forEach((item) => {
                if (!countrySet.has(item.country)) {
                    countrySet.add(item.country)
                }
            })

        const countryArr = [...countrySet]

        countryArr.forEach((item) => {
            setData(d => [...d, [item, item]])
        })

        //console.log(data);
    }, [state.userData]);

    return (
        <Chart
            chartEvents={[
                {
                    eventName: "select",
                    callback: ({ chartWrapper }) => {
                        const chart = chartWrapper.getChart();
                        const selection = chart.getSelection();
                        if (selection.length === 0) return
                        const region = data[selection[0].row + 1];
                        //console.log("Selected : " + region);
                    }
                }
            ]}
            chartType="GeoChart"
            data={data}
            width="100%"
            options={options}
        />
    )
}

export default CountryGraph
