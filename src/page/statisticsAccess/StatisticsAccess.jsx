import React from "react";
import StateMap from "../../components/stateMap/StateMap";
import { Container, Row } from "react-bootstrap"


export function StatisticsAccess () {
    return (
        <Container>
            <Row className ="text-center">
                <h1>Statistiques</h1>
            </Row>
            <StateMap />
        </Container>
    )
}