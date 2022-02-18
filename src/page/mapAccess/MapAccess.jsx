import Map from "../../components/map/Map"
import React from "react";
import { useState } from 'react'
import "./MapAccess.css";
import { MarkerModel } from "../../components/model/markerModel";
import { colors } from "../../components/model/colorsGasStation";


export function MapAccess () {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [gasStation, setResults] = useState([]);

    const getListOfGasStation = (async ( limit = 5, road= null, distance= null, price= null, fuel= null) => {
        let request = '?limit=${limit}';
        if(road != null) { request = request + '&road=' + road }
        if(distance != null) { request = request + '&distance=' + distance }
        if(price != null) { request = request + '&price=' + price }
        if(fuel != null) { request = request + '&fuel=' + fuel }

        return await fetch(`http://localhost:8080/api/sales-points${request}`)
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                setIsLoaded(true);
                setResults(jsonResponse);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            })
    })

    let markersList = []

    for(let elem of gasStation){
        console.log(elem)
        markersList.push(new MarkerModel(elem.position.latitude, elem.position.longitude, elem.address.street))
    }

    // let markersList = [new MarkerModel(43.27, 5.40, "Your position"), new MarkerModel(45.27, 7.40, "Your position2", colors.GREEN), new MarkerModel(44.27, 7.40, "WOW", colors.RED)]


    return (
        <div id="map-access">
            <h1>Map selection</h1>
            <Map id="map" position={[45,45 ]} markers={markersList}/>
        </div>
    )
}