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

    }

    useEffect(() => {
        fetchDataService.getListOfGasStation(callBack, errorCallBack,  null, null, null, null, null, null, null)
    }, [])

    if(!isLoaded){return <div>Loading...</div>}
    return (
        <div id="parameters" style={{height: '100%'}}>
            <form className="form" onSubmit={search()}>
                <div className="form-field">
                    <label>Limit : </label>
                    <input className="form-input" type="number" value={limit} onChange={(e) => setLimit(e.target.value)}/>
                </div>
                <div className="form-field">
                    <label>Road : </label>
                    <input className="form-input" type="text" value={road} onChange={(e) => setRoad(e.target.value)}/>
                </div>
                <div className="form-field">
                    <label>Distance : </label>
                    <input className="form-input" type="number" value={distance} onChange={(e) => setDistance(e.target.value)}/>
                </div>
                <div className="form-field">
                    <label>Price : </label>
                    <input className="form-input" type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
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
            </form>
        </div>
    )
}