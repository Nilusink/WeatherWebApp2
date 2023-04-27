/*
api_functions.js
27. April 2023

<description>

Author:
Nilusink
*/

const base_url = 'http://home.nilus.ink/'

export function getWeatherStations(setter, options="")
{
    fetch(base_url + 'simple/stations/' + options)
        .then(response => {
            return response.json();
        })
        .then(json => {
            setter(json);
        })
        .catch(error => {
            console.error(error);
        });
}


export function getWeatherData(setter, n=1, extraOptions="")
{
    const url = base_url + `simple/weather/?n_results=${n}&` + extraOptions;
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json => {
            setter(json);
        })
        .catch(error => {
            console.error(error);
        });
}