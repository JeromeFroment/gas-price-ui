import Map from "../../components/map/Map"
import React from "react";
import "./MapAccess.css";
import MapParameters from "../../components/mapParameters/MapParameters";

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