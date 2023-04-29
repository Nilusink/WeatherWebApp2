/*
sideBar.js
27. April 2023

<description>

Author:
Nilusink
*/
import './sideBar.css';
import {useState} from "react";


export default function SideBar(props)
{
    const stations = props.stations;
    const station_setter = props.setter;
    const [filter, setFilter] = useState("");

    let filtered_stations = [];
    stations.map((station) => {
        if (station.position.toLowerCase().includes(filter.toLowerCase()))
        {
            filtered_stations.push(station)
        }
    })

    return (
        <div className="side_container">
            <a className="side_title">Weather Stations</a>

            <input
                type="text"
                className="side_filter"
                placeholder="Filter"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
            />

            <ul className="side_list">
                {filtered_stations.map((item) => <StationPreview
                    data={item}
                    onPress={station_setter.bind(this, item.id)}
                    key={item.key}
                />)}
            </ul>
        </div>
    )
}


function StationPreview(props)
{
    const station_data = props.data;
    const onPress = props.onPress;
    // console.log("data: ", station_data);

    return (
        <div className="preview_container" onClick={onPress}>
            <a>{station_data.position}</a>
            <a className="preview_height">{Math.round(station_data.height * 10) / 10} m</a>
        </div>
    )
}
