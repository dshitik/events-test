import React from 'react';
import { Button, Row, Form, FormGroup } from 'react-bootstrap'
import { registerUserAPI } from '../api/registerUserAPI'
import { logout, getToken, setToken } from '../helpers/auth'
import {
  useHistory
} from "react-router-dom";
import { observer, useLocalStore } from "mobx-react-lite";

export const Registration = observer(() => {
  let history = useHistory();
  const registrationState = useLocalStore(() => ({
    email: '',
    password: '',
    token: getToken(),
    loading: false,
    setEmail(email) {
      registrationState.email = email
    },
    setPassword(password) {
      registrationState.password = password
    },
    resetToken() {
      registrationState.token = null
    },
  }));

  const createAndRegisterToken = () => {
    const btoaToken = window.btoa(`${registrationState.email}:${registrationState.password}`);
    setToken(btoaToken);
    history.push("/");
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    registerUserAPI(registrationState.email, registrationState.password).then(() => {
      createAndRegisterToken();
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    createAndRegisterToken();
  };

  const handleLogout = () => {
    logout();
    registrationState.resetToken();
  };
  return (
    <div className="container text-center h-100">

      <Row className="justify-content-md-center">
        <div className="col">
          <h1 className="display-3">Registration Page</h1>
        </div>
      </Row>
      <Row className="justify-content-md-center">
        <div className="col">
          {registrationState.token
            ? <div>You are is logged in <Button onClick={handleLogout}>Logout</Button></div>
            : (
              <div>
                <Form>
                  <Form.Group controlId="formEmail">
                    <Form.Control type="email" placeholder="Email"
                                  onChange={(e) => registrationState.setEmail(e.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Control type="password" placeholder="Password"
                                  onChange={(e) => registrationState.setPassword(e.target.value)}/>
                  </Form.Group>
                  <Button
                    onClick={handleRegistration}
                    variant="primary"
                    type="submit"
                  >
                    <span>&#128073;</span>Register<span>&#128072;</span></Button>
                </Form>
                <br/>
                <br/>
                <Form>
                  <Form.Group controlId="formEmail">
                    <Form.Control type="email" placeholder="Email"
                                  onChange={(e) => registrationState.setEmail(e.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Control type="password" placeholder="Password"
                                  onChange={(e) => registrationState.setPassword(e.target.value)}/>
                  </Form.Group>
                  <Button
                    onClick={handleLogin}
                    variant="primary"
                    type="submit"
                  >
                    <span>&#128073;</span>Login<span>&#128072;</span></Button>
                </Form>
              </div>
            )
          }
        </div>
      </Row>
    </div>
  )
});