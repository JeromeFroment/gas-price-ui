import React, {useRef, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {fetchDataService} from "../../service/fetchData.service";

function ListStations(){

    const [listStations, setlistStations] = useState([]);

    
    const callBack = (jsonResponse) => {
        setlistStations(jsonResponse);
        console.log(jsonResponse);
    }

    const errorCallBack = (error) => {
        console.log(error);
    }

    useEffect(() => {
        setlistStations([]);
        fetchDataService.getListOfGasStation(callBack, errorCallBack,  null, null, null, null, null, null, null)
    }, [])

    return (
        <div className="listStations">
            {listStations.map(station => (
                <Row>
                    <li id={listStations.findIndex(st => st === station)}> {station.address.street} - {station.address.postalCode} - {station.address.street} </li>
                </Row>
            ))}
        </div>
     )
}

export default ListStations;