import {getWeatherStations} from "./api_functions";
import StationView from "./stationView";
import SideBar from './sideBar';
import {useEffect, useState} from "react";
import './App.css';


function App() {
    const [stations, _setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState(-1);

    function setStations(value)
    {
        console.log("got value: ", value);
        _setStations(value);
        if (selectedStation === -1)
        {
            setSelectedStation(value[0]);
        }
    }

    function stationSelector(id)
    {
        console.log("selecting: ", id)
        for (const stationsKey in stations) {
            if (stations[stationsKey].id === id)
            {
                setSelectedStation(stations[stationsKey]);
            }
        }
    }

    useEffect(() => {
        getWeatherStations(setStations)
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <StationView
                    data={selectedStation}
                />
                <SideBar
                    stations={stations}
                    setter={stationSelector}
                />
            </header>
        </div>
    );
}

export default App;
