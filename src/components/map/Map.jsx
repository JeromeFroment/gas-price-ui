import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router";
import { MarkerModel } from "../model/markerModel";
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import LocationMarker from "../../components/locationMarker/LocationMarker";
import {fetchDataService} from "../../service/fetchData.service";
import MarkerClusterGroup from "react-leaflet-markercluster"

// import 'leaflet/dist/leaflet.css';
import './Map.css';
import { useEffect } from "react";
import { colors } from "../model/colorsGasStation";

const LIMIT = 1000;

function MapCenter(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [gasStation, setResults] = useState([]);
    const [distance, setDistance] = useState(null);
    const [lastCenter, setCenter] = useState([]);
    
    const callBack = (jsonResponse) => {
        let markers = [];
        if(jsonResponse.length < LIMIT) {
                jsonResponse.forEach(element => {
                    try{
                        let next = new MarkerModel(element.position.coordinates[1] , element.position.coordinates[0] , element.address.city + ", " + element.address.street + " | " + (()=>{
                            let prices = "";
                            for(let i = 0; i < element.prices.length; i++){
                                prices += element.prices[i].name + ": " + element.prices[i].value + " |";
                            }
                            return prices;
                        })());
                        markers.push(next.render())
                    }catch(e){
                        console.log(e);
                    }
                })
                setResults(markers);
                setIsLoaded(true);
                props.childIsLoaad(true);
        }else if (jsonResponse.length != undefined){
            if(lastCenter.lat && lastCenter.lng){
                fetchDataService.getListOfGasStation((jsonResponse)=>{
                    let next = new MarkerModel(lastCenter.lat, lastCenter.lng, "Zoom to see the " + jsonResponse.length + " gas stations", colors.ZOOM, [50,50]);
                    markers.push(next.render())
                    setResults(markers);
                    setIsLoaded(true);
                    props.childIsLoaad(true);
                }, errorCallBack,  null, null, distance, lastCenter.lat, lastCenter.lng, null, null)
            }
        }
    }

    const errorCallBack = (error) => {
        console.log(error);
        setIsLoaded(true);
        setError(error);
    }
    
    const [fetched, setFetched] = React.useState(false);

    useEffect(() => {
        fetchDataService.getListOfGasStation(callBack, errorCallBack,  null, null, null, null, null, null, null)
    }, [])

    const map = useMapEvents({
      dragend: (e) => {
        const bounds = e.target.getBounds();
        const center = e.target.getCenter();
        setDistance(bounds._southWest.distanceTo(bounds._northEast))
        setCenter(center)
        fetchDataService.getListOfGasStation(callBack, errorCallBack,  LIMIT, null, bounds._southWest.distanceTo(bounds._northEast), center.lat, center.lng, null, null)
      }, 
      zoomend: (e) => {
        const bounds = e.target.getBounds();
        const center = e.target.getCenter();
        setDistance(bounds._southWest.distanceTo(bounds._northEast))
        setCenter(center)
        fetchDataService.getListOfGasStation(callBack, errorCallBack, LIMIT, null, bounds._southWest.distanceTo(bounds._northEast), center.lat, center.lng, null, null)
      }
    });

    if(isLoaded)
        return (
        <>
            <MarkerClusterGroup>
                {gasStation}
            </MarkerClusterGroup>
        </>);
    else
        return null;
  }

export default function Map(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [gasStation, setResults] = useState([]);
    const [childIsLoaad, setChildIsLoaded] = useState(false);

    const center= <MapCenter childIsLoaad={setChildIsLoaded}/>

    const navigate = useNavigate();
// style={{visibility: center.isLoaded?'visible':'hidden'}}
    return (
        <>  
            <div id="map" style={{height: '100%'}}>
            {(()=>{
                if(error){
                    return <div>Erreur lors du chargement des données : {error.toString()} </div>
                }
            })()}
                <MapContainer preferCanvas={true} center={[43.27, 5.40]} zoom={9}  >
                    {center}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker/>
                </MapContainer>
            </div>
        </>
    )
}