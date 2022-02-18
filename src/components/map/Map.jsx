import React, { useMemo } from "react";
import { useState } from 'react'
import { useNavigate } from "react-router";
import { MarkerModel } from "../model/markerModel";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet';

// import 'leaflet/dist/leaflet.css';
import './Map.css';
import { requirePropFactory } from "@mui/material";
import { useEffect } from "react";

function LocationMarker() {
    const [position, setPosition] = useState(null)

    let positionIcon = L.icon({
        iconUrl: require("../../asset/pinContrast.png"),
        iconSize:     [38, 38], // size of the icon
        shadowSize: [38,38],
        shadowAnchor: [19,38],
        iconAnchor:   [19,38], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    })

    const map = useMap();
    map.locate()
    map.addEventListener('locationfound', (e) => {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
    })

    return position === null ? null : (
      <Marker position={position} icon={positionIcon}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

export default function Map(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [gasStation, setResults] = useState([]);

    const navigate = useNavigate();

    const getAllGasStation = (() => {
        fetch(`http://localhost:8080/`)
            .then((response) => response.json())
            .then((jsonResponse) => {
                setIsLoaded(true);
                jsonResponse.forEach(element => {

                })
                setResults(jsonResponse);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            })
    })

    useEffect(()=>{
        fetch(`http://localhost:8080/`)
            .then((response) => response.json())
            .then((jsonResponse) => {
                setIsLoaded(true);
                let markers = [];
                jsonResponse.forEach(element => {
                    let next = new MarkerModel(element.position.latitude , element.position.longitude , element.id);
                    markers.push(next.render())
                })
                console.log(markers)
                setResults(markers);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }, [])

    const getListOfGasStation = (( limit = 5, road= null, distance= null, price= null, fuel= null) => {
        let request = '?limit=${limit}';
        if(road != null) { request = request + '&road=' + road }
        if(distance != null) { request = request + '&distance=' + distance }
        if(price != null) { request = request + '&price=' + price }
        if(fuel != null) { request = request + '&fuel=' + fuel }

        fetch(`http://localhost:8080/api/sales-points${request}`)
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

    const state = {
        position: (props.position) ? props.position : [43.27, 5.40],
        markers: props.markers
    }

    const mapStyle = {
        height: '100%',
    }
    
    let markersRender = []
    for(let marker of state.markers){
        markersRender.push(marker.render(gasStation))
    }
    // gasStation.forEach(gasStation => {
    //     console.log(gasStation)
    //     // let next = new MarkerModel(gasStation.position.latitude, gasStation.position.longitude, "");
    //     // markersRender.push(next.render())
    // })
    if(!isLoaded){return <div>Loading...</div>}
    return (
        <>  
            <div id="map" style={mapStyle}>
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