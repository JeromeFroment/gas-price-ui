import React, {useContext, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {fetchDataService} from "../../service/fetchData.service";
import MapParameters from "../../components/mapParameters/MapParameters";
import "./ListStations.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import {FilterContext} from "../../contexts/FilterContext";

function ListStations(){

    const [listStations, setlistStations] = useState([]);
    const [stateVisibility, setStateVisibility] = useState(false);
    const [elementId, setElementId] = useState(0);
    
    const filterContext = useContext(FilterContext);
    const filter = filterContext.filter;
    
    
    const callBack = (jsonResponse) => {
        if (listStations.length == 0) {
            setlistStations(jsonResponse.slice(0, 10).sort(function(a, b){
                if(a.address.street < b.address.street) { return -1; }
                if(a.address.street > b.address.street) { return 1; }
                return 0;
            }));
        } else {
            setlistStations(jsonResponse.sort(function(a, b){
                if(a.address.street < b.address.street) { return -1; }
                if(a.address.street > b.address.street) { return 1; }
                return 0;
            }));
        }
    }

    const errorCallBack = (error) => {
        console.log(error);
    }

    useEffect(() => {
        setlistStations([]);
        let newLim = 10;
        if (filter.limit != 0) {
            newLim = filter.limit;
        }
        if (newLim == null) {
            newLim = 10;
        }
        console.log(newLim);
        fetchDataService.getListOfGasStation(callBack, errorCallBack, newLim, filter.road, null, null, null, filter.price, filter.fuel)
    }, [filter])

    const setVisibility = (id) => {
        setElementId(id);
        setStateVisibility(!stateVisibility)
    }

    return (
        <div className="listStations">
            <Container>
                <Row>
                    <Col>
                        {listStations.map(station => (
                            <div className="station" onClick={((e) => setVisibility(station.id))}>
                                <Row>
                                    <Col className="title" sm={10} id={listStations.findIndex(st => st === station)}> 
                                        {station.address.street} - {station.address.city}
                                    </Col>
                                    <Col sm={2}>
                                        <FontAwesomeIcon icon={faAngleDown} className="w-75" />
                                    </Col>
                                </Row>
                                <Row id={station.id} className={(stateVisibility === true && elementId === station.id) ? 'visible': 'hidden'} >
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
                    <Col xs={12} lg={5} className="filter">
                        <MapParameters id="parameters-container"/>
                    </Col>
                </Row>
            </Container>
        </div>
          
     )
}

export default ListStations;