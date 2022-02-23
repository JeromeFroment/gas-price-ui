import Map from "../../components/map/Map"
import React from "react";
import "./MapAccess.css";
import { MarkerModel } from "../../components/model/markerModel";
import { colors } from "../../components/model/colorsGasStation";



export function MapAccess () {

    return (
        <div id="map-access">
            <h1>Map selection</h1>
            <Map id="map" position={[45,45 ]} markers={[]}/>
        </div>
    )
}