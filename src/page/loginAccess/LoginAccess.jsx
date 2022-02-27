import React from "react";
import Container from 'react-bootstrap/Container';
import  LoginForm  from "../../components/loginForm/LoginForm"

export function LoginAccess ({ setToken }) {

    return (
        <Container>
            <LoginForm setToken={setToken} />
        </Container>
    )
}