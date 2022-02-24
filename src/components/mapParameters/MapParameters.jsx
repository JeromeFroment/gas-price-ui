import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router";
import {fetchDataService} from "../../service/fetchData.service";

import './MapParameters.css';
import { useEffect } from "react";
import {FilterModel} from "../model/filterModel";

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
        jsonResponse.forEach(element => {})
        setIsLoaded(true);
    }

    const errorCallBack = (error) => {
        setIsLoaded(true);
        setError(error);
    }

    const search = () => {
        let filter = new FilterModel(limit, road, distance, price, fuel);
        console.log(filter)
        filter.checkFilters()
        console.log(filter)
        // callBack, errorCallBack, limit = null, road= null, distance= null, lat= null, long= null, price= null, fuel= null
        fetchDataService.getListOfGasStation(console.log, (()=>{}), filter.limit, filter.road, filter.distance, null, null, filter.price, filter.fuel)
    }

    const clear = () => {

    }

    useEffect(() => {
        fetchDataService.getListOfGasStation(callBack, errorCallBack,  null, null, null, null, null, null, null)
    }, [])

    if(!isLoaded){return <div>Loading...</div>}
    return (
        <div id="parameters" style={{height: '100%'}}>
            <h2 id="title-filter">Filters</h2>
            <form className="form" onSubmit={search}>
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
                <input className="form-submit" type="submit" value="Filter" />
                <button className="form-clear" onClick={clear}>Clear</button>
            </form>
        </div>
    )
}