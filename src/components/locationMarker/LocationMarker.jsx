import React from "react";
import { useState } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet';

export default function LocationMarker() {
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
