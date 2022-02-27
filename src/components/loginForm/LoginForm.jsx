import React, {useContext} from "react";
import { useState } from 'react'
import { useNavigate } from "react-router";
import {Form, Button, Row, Col} from 'react-bootstrap';
import "./LoginForm.css";
import PropTypes from 'prop-types';
import { inscriptionUserService } from "../../service/inscriptionUser.service";


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
    const [firstName, setFirstName] = useState();
    const [lasttName, setLastName] = useState();
    const [registered, setRegistered] = useState();

    const handleSubmitConnection = async e => {
        e.preventDefault();
        const token = await loginUser({
          email,
          password
        });
        setToken(token);
    }

    const handleSubmitInscription = async e => {
        inscriptionUserService.postUser(callBack, errorCallBack, firstName, lasttName, email, password)
    }

    const callBack = (jsonResponse) => {
        setRegistered(true);
    }

    const errorCallBack = (error) => {
        setRegistered(false);
        console.log(error);
    }

    return (
        <div id="login" className="w-100">
            <Row className="justify-content-center m-3">
                <Col xs={8} lg="6" className="mb-3">
                    <Row className="text-center">
                        <h1 className="m-0">Connexion</h1>
                    </Row>
                    <Form className="form mt-3" onSubmit={handleSubmitConnection}>
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
                <Col xs={8} lg="6">
                    <Row className="text-center">
                        <h1 className="m-0">Inscription</h1>
                    </Row>
                    <Form className="form mt-3" onSubmit={handleSubmitInscription}>
                        <Row>
                            <Form.Group>
                                <Row className="justify-content-center">
                                    <Col xs lg={5}>
                                        <Form.Label>Prénom </Form.Label>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col xs lg={5}>
                                        <Form.Control className="form-input" type="text" onChange={e => setLastName(e.target.value)}/>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Row className="justify-content-center">
                                    <Col xs lg={5}>
                                        <Form.Label>Nom </Form.Label>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col xs lg={5}>
                                        <Form.Control className="form-input" type="text" onChange={e => setFirstName(e.target.value)}/>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Row>
                        <Row >
                            <Form.Group>
                                <Row className="justify-content-center">
                                    <Col xs lg={5}>
                                        <Form.Label>Mail : </Form.Label>
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
                    {(registered)?
                        <Row>
                            <h2>Inscription validée</h2>
                        </Row>
                        :
                        <></>
                    }
                </Col>
            </Row>
        </div>
    )
}

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
}