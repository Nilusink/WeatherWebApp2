/*
stationView.js
27. April 2023

<description>

Author:
Nilusink
*/
import './stationView.css';
import {useState} from "react";
import {getWeatherData} from "./api_functions";
import {weatherTypePredictor} from "./weatherTypePredictor";

import CanvasJSReact from './canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function StationView(props)
{
    const station_data = props.data;
    const [lastWeatherID, setLastWeatherID] = useState(-1);
    const [lastWeather, setLastWeather] = useState(-1);


    // refresh on new data
    if (lastWeatherID !== station_data.id && station_data.id !== undefined)
    {
        setLastWeatherID(station_data.id);
        setLastWeather(-1);
        getWeatherData(setLastWeather, 5 * (60 / 5), `station_id=${station_data.id}`);
    }

    if (!station_data)
    {
        return (<div className="station_container"/>)
    }


    function WeatherData()
    {
        if (lastWeather === -1 || station_data.id === undefined)
        {
            return (
                <>
                    <div className="station_quickview">
                        <div className="station_titlebar">
                            <a className="station_title">{station_data.position}</a>
                        </div>
                        <a className="temperature_text"></a>
                    </div>
                    <div className="weather_fetch_container">
                        fetching data ...
                    </div>
                </>
            )
        }
        else if (lastWeather.length === 0)
        {
            return (
                <>
                    <div className="station_quickview">
                        <div className="station_titlebar">
                            <a className="station_title">{station_data.position}</a>
                        </div>
                        <a className="temperature_text"></a>
                    </div>
                    <div className="weather_fetch_container">
                        No Data
                    </div>
                </>
            )
        }
        else
        {
            return (
                <>
                    <div className="station_quickview">
                        <div className="station_titlebar">
                            <a className="station_title">{station_data.position}</a>
                            <img src={weatherTypePredictor(
                                lastWeather[0].temperature,
                                lastWeather[0].humidity,
                                lastWeather[0].time
                            )} alt="icon" className="weather_icon"/>

                        </div>
                        <a className="temperature_text">{Math.round(lastWeather[0].temperature)}°</a>
                    </div>
                    <div className="history_container">
                        <div className="graph_container">
                            <WeatherGraph data={lastWeather}/>
                        </div>
                        <div className="points_container">
                            <PartWeather weather={lastWeather[48]}/>
                            <div className="separator"/>
                            <PartWeather weather={lastWeather[36]}/>
                            <div className="separator"/>
                            <PartWeather weather={lastWeather[24]}/>
                            <div className="separator"/>
                            <PartWeather weather={lastWeather[12]}/>
                            <div className="separator"/>
                            <PartWeather weather={lastWeather[0]}/>
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <div className="station_container">
            <WeatherData/>
        </div>
    )
}


function toDate(string_date)
{
    string_date = string_date.replace("-", "T").replace(".", "-").replace(".", "-");
    return new Date(string_date);

}


function WeatherGraph(props)
{
    const weather_data = props.data;

    let data_points = [];

    for (const weatherDataKey in weather_data) {
        data_points.push({
            markerType: "none",
            lineColor: "#ca6e10",
            x: toDate(weather_data[weatherDataKey].time),
            y: weather_data[weatherDataKey].temperature
        })
    }

    const options = {
        animationEnabled: true,
        backgroundColor: "transparent",
        axisX:{
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            labelFormatter: function(){
                return " ";
            }
        },
        axisY:{
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            labelFormatter: function(){
                return " ";
            }
        },
        // width: 1000,
        height: 200,
        data: [{
        yValueFormatString: "#,###°",
        xValueFormatString: "HH:MM",
        type: "spline",
        lineThickness: 4,
        dataPoints: data_points
    }]
    }
    return (
        <CanvasJSChart
            options={options}
        />
    )
}


function PartWeather(props)
{
    const weather = props.weather;
    const time = toDate(weather.time);

    return (
        <div className="part_container">
            <a>{time.getHours()}:{time.getMinutes()}</a>
            <a>{weather.temperature.toFixed(1)}°</a>
        </div>
    )
}
