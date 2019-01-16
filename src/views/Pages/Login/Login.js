import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
// import { auth } from '../../../auth';

class Login extends Component {

  state = {
    email: '',
    password: '',
    error: null,
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await this.props.onLogin(email, password);
    } catch (error) {
      this.setState({ error });
    }
  };

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-email"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" name="email" placeholder="Email" autoComplete="email" value={email} onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" placeholder="Password" autoComplete="current-password" value={password} onChange={this.handleChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4" disabled={isInvalid}>Login</Button>
                        </Col>
                        {/*<Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col> */}
                      </Row>
                      {error && <Row>{error.message}</Row>}
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <img src="https://www.uninorte.edu.co/documents/12040215/12766369/quienes+somos-37.png/cd43cd3b-4748-4d05-8bf5-bbda1d59ac0b?t=1493740637437" alt="UNINORTE" width="100%" />
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
