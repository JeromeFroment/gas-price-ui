import React from "react";
import StateMap from "../../components/stateMap/StateMap";
import { Container, Row } from "react-bootstrap"
import "./StatisticsAccess.css";


export function StatisticsAccess () {
    return (
        <Container>
            <Row className ="text-center m-3em">
                <h1>Statistiques</h1>
            </Row>
            <StateMap />
        </Container>
    )
}