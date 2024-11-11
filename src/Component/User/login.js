import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import '../../Assets/Stlyes/login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
    navigate('/search'); // '/newpage' ko us path se replace karein jahan navigate karna hai
  };
  return (
    <Container fluid className="login-container">
      <Row className="login-row">
        <Col md={6} className="left-column">
          <h1>OpenSearch</h1>
        </Col>
        <Col md={6} className="right-column">
          <Form className="login-form">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter you email " />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" placeholder="Enter your password" />

  <div className="d-flex justify-content-between mt-2">
    <a href="/forgotPassword" className="forgot-password-link">Forgot Password?</a>
    <button  onClick={handleClick} type="submit"  className="login-button">
      Login
    </button>
  </div>
</Form.Group>
               
            
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
