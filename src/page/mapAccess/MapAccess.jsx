import Map from "../../components/map/Map"
import React from "react";
import "./MapAccess.css";
import MapParameters from "../../components/mapParameters/MapParameters";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function MapAccess () {

    return (
        <Container>
            <Row>
                <h1 className ="text-center mt-2 mb-4">Map selection</h1>
                </Row>
            <Row>
                <Col >
                    <Map className="w-100" position={[45,45 ]} markers={[]}/>
                </Col>
                <Col xs={12} lg={5}>
                    <MapParameters className="filter"/>
                </Col>
            </Row>
        </Container>
    )
}