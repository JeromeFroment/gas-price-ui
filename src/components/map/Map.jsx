import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router";
import { MarkerModel } from "../model/markerModel";
import { MapContainer, TileLayer } from 'react-leaflet'
import LocationMarker from "../../components/locationMarker/LocationMarker";
import {fetchDataService} from "../../service/fetchData.service";

// import 'leaflet/dist/leaflet.css';
import './Map.css';
import { useEffect } from "react";


export default function Map(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [gasStation, setResults] = useState([]);

    const navigate = useNavigate();

    const callBack = (jsonResponse) => {
        setIsLoaded(true);
        let markers = [];
        jsonResponse.forEach(element => {
            let next = new MarkerModel(element.position.latitude , element.position.longitude , element.id);
            markers.push(next.render())
        })
        setResults(markers);
    }

    const errorCallBack = (error) => {
        setIsLoaded(true);
        setError(error);
    }

    useEffect(()=>{
        fetchDataService.getAllGasStation(callBack, errorCallBack)
    }, [])

    const state = {
        position: (props.position) ? props.position : [43.27, 5.40],
        markers: props.markers
    }
    
    let markersRender = []
    for(let marker of state.markers){
        markersRender.push(marker.render(gasStation))
    }

    if(!isLoaded){return <div>Loading...</div>}
    return (
        <>  
            <div id="map" style={{height: '100%'}}>
                <MapContainer center={state.position} zoom={9}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                    {gasStation}
                    {markersRender}
                </MapContainer>
            </div>
        </>
    )
}

/* <Button onClick={() => {
                // JE SAIS PAS ENCORE FAIRE DE TESTS AVEC REACT ALORS LAISSEZ MOI ESSAYER
                const listOfGasStationNoArg = getListOfGasStation();
                const listOfGasStationLim = getListOfGasStation(5);
                const listOfGasStationRoad = getListOfGasStation(5, "RD 93 GRANDE RUE");
                const listOfGasStationDistance = getListOfGasStation(5, "RD 93 GRANDE RUE", 3);
                const listOfGasStationPrice = getListOfGasStation(5, null, null, 1.5);
                const listOfGasStationFuel = getListOfGasStation(5, null, null, null, "SP98");
} } */