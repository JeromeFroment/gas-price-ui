import React, {useContext} from "react";
import { useState } from 'react'
import { useNavigate } from "react-router";
import './MapParameters.css';
import {FilterModel} from "../model/filterModel";
import {FilterContext} from "../../contexts/FilterContext";

export default function MapParameters(props){
    const [road, setRoad] = useState("");
    const [price, setPrice] = useState(0);
    const [fuel, setFuel] = useState("");

    const navigate = useNavigate();
    const filterContext = useContext(FilterContext);

    const search = () => {
        let filter = new FilterModel(road, price, fuel);
        filter.checkFilters()
        filterContext.updateFilter(filter);
    }

    const clear = () => {
        setRoad("");
        setPrice(0);
        setFuel("");
        let filter = new FilterModel();
        filterContext.updateFilter(filter);
    }

    return (
        <div id="parameters" style={{height: '100%'}}>
            <h2 id="title-filter">Filters</h2>
            <form className="form">
                <div className="form-field">
                    <label>Type de station : </label><br/>
                    <select value={road} onChange={(e) => setRoad(e.target.value)}>
                        <option value="">--------</option>
                        <option value="A">Station d'autoroute</option>
                        <option value="R">Station standard</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Price (€) : </label><br/>
                    {(fuel != "") ?
                        <input min="0" className="form-input" type="number" value={price}
                               onChange={(e) => setPrice(e.target.value)}/> :
                        <input min="0" className="form-input" type="text" disabled="disabled"
                               value="Veuillez sélectionner un type de carburant"/>
                    }
                </div>
                <div className="form-field">
                    <label>Fuel : </label><br/>
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
            </form>
            <button className="form-submit" onClick={search}>Search</button>
            <button className="form-clear" onClick={clear}>Clear</button>
        </div>
    )
}