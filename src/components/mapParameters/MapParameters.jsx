import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router";
import {fetchDataService} from "../../service/fetchData.service";

import './MapParameters.css';
import { useEffect } from "react";

export default function MapParameters(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [limit, setLimit] = useState(1000);
    const [road, setRoad] = useState("");
    const [distance, setDistance] = useState(0);
    const [price, setPrice] = useState(0);
    const [fuel, setFuel] = useState("");

    const navigate = useNavigate();

    const callBack = (jsonResponse) => {
        let markers = [];

        jsonResponse.forEach(element => {

        })
        setIsLoaded(true);
    }

    const errorCallBack = (error) => {
        setIsLoaded(true);
        setError(error);
    }

    const search = () => {
        let limitRequest = null;
        let roadRequest = null;
        let distanceRequest = null;
        let priceRequest = null;
        let fuelRequest = null;
        if(limit > 0) { limitRequest = limit }
        if(road != "") { roadRequest = road }
        if(distance > 0) { distanceRequest = distance }
        if(price > 0) { priceRequest = price }
        if(fuel != "") { fuelRequest = fuel }
        // callBack, errorCallBack, limit = null, road= null, distance= null, lat= null, long= null, price= null, fuel= null
        fetchDataService.getListOfGasStation(console.log, (()=>{}),  limitRequest, roadRequest, distanceRequest, null, null, priceRequest, fuelRequest)
    }

    const clear = () => {
        setLimit(1000)
        setRoad("")
        setDistance(0)
        setPrice(0)
        setFuel("")
    }

    useEffect(() => {
        fetchDataService.getListOfGasStation(callBack, errorCallBack,  null, null, null, null, null, null, null)
    }, [])

    if(!isLoaded){return <div>Loading...</div>}
    return (
        <div id="parameters" style={{height: '100%'}}>
            <h2 id="title-filter">Filters</h2>
            <form className="form">
                <div className="form-field">
                    <label>Limit : </label>
                    <input min="0" className="form-input" type="number" value={limit} onChange={(e) => setLimit(e.target.value)}/>
                </div>
                <div className="form-field">
                    <label>Road : </label>
                    <input className="form-input" type="text" value={road} onChange={(e) => setRoad(e.target.value)}/>
                </div>
                <div className="form-field">
                    <label>Distance (m) : </label>
                    <input min="0" className="form-input" type="number" value={distance} onChange={(e) => setDistance(e.target.value)}/>
                </div>
                <div className="form-field">
                    <label>Price (€) : </label>
                    <input min="0" className="form-input" type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div className="form-field">
                    <label>Fuel : </label>
                    <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
                        <option value="">--------</option>
                        <option value="SP98">SP98</option>
                        <option value="SP95">SP95</option>
                        <option value="Gazole">Gazole</option>
                        <option value="E10">E10</option>
                        <option value="E85">E85</option>
                        <option value="GPLc">GPLc</option>
                    </select>
                </div>
                <button className="form-submit" onClick={search}>Filter</button>
                <button className="form-clear" onClick={clear}>Clear</button>
            </form>
        </div>
    )
}