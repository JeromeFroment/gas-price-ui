import Map from "../../components/map/Map"
import React from "react";
import "./MapAccess.css";
import MapParameters from "../../components/mapParameters/MapParameters";
import { MarkerModel } from "../../components/model/markerModel";
import { colors } from "../../components/model/colorsGasStation";
import {FilterModel} from "../../components/model/filterModel";
import {FilterProvider} from "../../contexts/FilterContext";

export function MapAccess () {

    return (
        <div id="map-access">
            <h1>Map selection</h1>
                <div id="map-parameters-container">
                    <Map id="map-container" position={[45,45 ]} markers={[]}/>
                    <MapParameters id="parameters-container"/>
                </div>
        </div>
    )
}