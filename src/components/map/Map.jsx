import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router";
import { MarkerModel } from "../model/markerModel";
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import LocationMarker from "../../components/locationMarker/LocationMarker";
import {fetchDataService} from "../../service/fetchData.service";
import { mathService } from "../../service/math.service";

// import 'leaflet/dist/leaflet.css';
import './Map.css';
import { useEffect } from "react";

import L from 'leaflet';

function MapCenter() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [gasStation, setResults] = useState([]);
    
    const callBack = (jsonResponse) => {
        let markers = [];
        jsonResponse.forEach(element => {
            let next = new MarkerModel(element.position.coordinates[1] , element.position.coordinates[0] , element.id);
            markers.push(next.render())
        })
        setResults(markers);
        setIsLoaded(true);
    }

    const errorCallBack = (error) => {
        setIsLoaded(true);
        setError(error);
    }

    const map = useMapEvents({
      dragend: (e) => {
        const bounds = e.target.getBounds()
        const center = e.target.getCenter()
        fetchDataService.getListOfGasStation(callBack, errorCallBack, null, null, mathService.distanceBeetweenPoints(bounds._southWest.lat,bounds._southWest.lng, bounds._northEast.lat, bounds._northEast.lng), center.lat, center.lng, null, null)
      }, 
      zoomend: (e) => {
        const bounds = e.target.getBounds()
        const center = e.target.getCenter()
        fetchDataService.getListOfGasStation(callBack, errorCallBack, null, null, mathService.distanceBeetweenPoints(bounds._southWest.lat,bounds._southWest.lng, bounds._northEast.lat, bounds._northEast.lng), center.lat, center.lng, null, null)
      }
    });
    if(isLoaded)
        return (<>{gasStation}</>);
    else
        return null;
  }

export default function Map(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [gasStation, setResults] = useState([]);

    const navigate = useNavigate();

    const callBack = (jsonResponse) => {
        setIsLoaded(true);
        let markers = [];
        jsonResponse.forEach(element => {
            let next = new MarkerModel(element.position.coordinates[1] , element.position.coordinates[0] , element.id);
            markers.push(next.render())
        })
        setResults(markers);
    }

    const errorCallBack = (error) => {
        setIsLoaded(true);
        setError(error);
    }

    useEffect(()=>{
        
        // fetchDataService.getListOfGasStation(callBack, errorCallBack, null, null, 100, location.position.lat, location.position.lng, null, null)
        fetchDataService.getListOfGasStation(callBack, errorCallBack, 10, null, null, null, null, null, null)
    }, [])

    const handleDragEnd = (e) => {
        console.log(e)
        console.log("HELLO")
    }

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
            {(()=>{
                if(error){
                    return <div>Erreur lors du chargement des données : {error.toString()} </div>
                }
            })()}
                <MapContainer center={state.position} zoom={9} onDragend={handleDragEnd}>
                    <MapCenter/>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker/>
                    {/* {gasStation} */}
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