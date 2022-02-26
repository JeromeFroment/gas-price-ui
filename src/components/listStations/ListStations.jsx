import React, {useRef, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {fetchDataService} from "../../service/fetchData.service";
import MapParameters from "../../components/mapParameters/MapParameters";
import "./ListStations.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

function ListStations(){

    const [listStations, setlistStations] = useState([]);
    const [stateVisibility, setStateVisibility] = useState(false);
    
    
    const callBack = (jsonResponse) => {
        setlistStations(jsonResponse.slice(0, 10));
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
            <Container>
                <Row>
                    <Col>
                        {listStations.map(station => (
                            <div className="station" onClick={() => setStateVisibility(!stateVisibility)}>
                                <Row >
                                    <Col className="title" sm={10} id={listStations.findIndex(st => st === station)}> 
                                        {station.address.street} - {station.address.city}
                                    </Col>
                                    <Col sm={2}>
                                        <FontAwesomeIcon icon={faAngleDown} className="w-75" />
                                    </Col>
                                </Row>
                                <Row className={stateVisibility ? 'visible': 'hidden'} >
                                    {station.prices.map(price => (
                                        <Row className="justify-content-md-center" key={price.name}>
                                            <Col sm={3}>{price.name}</Col> 
                                            <Col sm={3}>{Number((price.value).toFixed(3))} euros</Col>
                                        </Row>
                                    ))}
                                </Row>
                            </div>
                            
                        ))}
                    </Col>
                    <Col className="filter">
                        <MapParameters id="parameters-container"/>
                    </Col>
                </Row>
            </Container>
        </div>
          
     )
}

export default ListStations;