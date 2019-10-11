import React, { useState } from 'react';
import { Button, Row } from 'react-bootstrap'
import { login, DEFAULT_TOKEN, logout, getToken } from '../helpers/auth'

export const Registration = () => {
  const [ token, setToken ] = useState(getToken());
  const handleRegistration = () => {
    login();
    setToken(DEFAULT_TOKEN);
  };
  const handleLogout = () => {
    logout();
    setToken(null);
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
          {token
            ? <div>You are is logged in <Button onClick={handleLogout}>Logout</Button></div>
            : <Button onClick={handleRegistration}><span>&#128073;</span>Just click here <span>&#128072;</span></Button>
          }
        </div>
      </Row>
    </div>
  )
};