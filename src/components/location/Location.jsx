import React from "react";
import { Button } from "react-bootstrap";


function Location(props) {

    const geo = () => {
        if(navigator.geolocation){
           navigator.geolocation.getCurrentPosition((position) => {
            props.onChange([position.coords.latitude, position.coords.longitude]); 
           });        
        } else {
           alert("La géolocalisation n'est pas supportée par le navigateur")
        }
     }

    return(
        <Button className="location" onClick={geo}>Localisez-moi</Button>
    );
}

export default Location;