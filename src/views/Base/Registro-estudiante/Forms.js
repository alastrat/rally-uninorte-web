import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

class Forms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Registro</strong> Estudiantes
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Nombre</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Apellidos</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Tipo de documento</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="radio1" name="radios" value="CC" />
                        <Label check className="form-check-label" htmlFor="radio1">Cédula</Label>
                      </FormGroup>
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="radio2" name="radios" value="TI" />
                        <Label check className="form-check-label" htmlFor="radio2">Tarjeta de Identidad</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Número de documento</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Programa Académico</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="select" id="select">
                        <option value="1">Arquitectura</option>
                        <option value="2">Diseño Grafico</option>
                        <option value="3">Diseño Industrial</option>
                        <option value="4">Matematicas</option>
                        <option value="5">Geologia</option>
                        <option value="6">Medicina</option>
                        <option value="7">Enfermeria</option>
                        <option value="8">Odontologia</option>
                        <option value="9">Derecho</option>
                        <option value="10">Ciencias Politicas y gobierno</option>
                        <option value="11">Relaciones Internacionales</option>
                        <option value="12">Licenciatura en Pedagogía Infantil </option>
                        <option value="13">Licenciatura en Matemáticas</option>
                        <option value="14">Licenciatura en Filosofía y Humanidades</option>
                        <option value="15">Negocios Internacionales</option>
                        <option value="16">Administración de Empresas</option>
                        <option value="17">Contaduría Pública</option>
                        <option value="18">Comunicación Social y Periodismo</option>
                        <option value="19">Economía</option>
                        <option value="20">Filosofía y Humanidades</option>
                        <option value="21">Psicología</option>
                        <option value="22">Ingeniería Civil</option>
                        <option value="23">Ingeniería de Sistemas y Computación</option>
                        <option value="24">Ingeniería Eléctrica</option>
                        <option value="25">Ingeniería Electrónica</option>
                        <option value="26">Ingeniería Industrial</option>
                        <option value="27">Ingeniería Mecánica</option>
                        <option value="28">Musica</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Forms;
