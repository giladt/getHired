import React from 'react';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import NavBar from './Components/NavBar/nav_bar'
import Styles from './Styles/app.module.css'

function App() {
  return (
    <div className={Styles.body}>
      <NavBar />
      <Container fluid='lg' className="justify-content-md-center">
        <Card 
          className={Styles.Card}>
          <Card.Header>Login</Card.Header>
          <Form>
            <Card.Body>
              <Form.Group as={Row} controlId="formBasicEmail">
                <Form.Label column>Username<br/>(Your Email address)</Form.Label>
                <Col sm={12}>
                  <Form.Control type="email" placeholder="Ex. name@service.com" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formBasicPassword">
                <Form.Label column>Password</Form.Label>
                <Col sm={12}>
                  <Form.Control type="password" placeholder="At least 8 characters" />
                </Col>
              </Form.Group>
              <Button variant="primary" type="submit" as={Col}>
                  Submit
              </Button>
            </Card.Body>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default App;
