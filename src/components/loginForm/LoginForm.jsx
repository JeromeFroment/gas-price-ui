import React, {useContext} from "react";
import { useState } from 'react'
import { useNavigate } from "react-router";
import {Form, Button, Row, Col} from 'react-bootstrap';
import "./LoginForm.css";
import PropTypes from 'prop-types';


async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}
   

export default function LoginForm({ setToken }){

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          email,
          password
        });
        setToken(token);
    }

    return (
        <div id="login" className="w-100">
            <Row className="text-center">
                <h1 className="m-0">Connexion</h1>
            </Row>
            <Row className="justify-content-center m-3">
                <Col xs lg={8}>
                    <Form className="form" onSubmit={handleSubmit}>
                        <Row >
                            <Form.Group>
                                <Row className="justify-content-center">
                                    <Col xs lg={5}>
                                        <Form.Label>Identifiant : </Form.Label>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col xs lg={5}>
                                        <Form.Control className="form-input" type="text" onChange={e => setEmail(e.target.value)}/>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Row className="justify-content-center">
                                    <Col xs lg={5}>
                                        <Form.Label>Mot de passe : </Form.Label>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col xs lg={5}>
                                        <Form.Control className="form-input" type="password" onChange={e => setPassword(e.target.value)}/>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Row>
                        <Row className="mt-3 justify-content-center">
                            <Col xs="auto" lg="auto" className="">
                                <Button variant="primary" type="submit">Connexion</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
}