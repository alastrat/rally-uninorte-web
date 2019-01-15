import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
import axios from 'axios';

const programas = [
  { id: 1, nombre: "Arquitectura" },
  { id: 2, nombre: "Diseño Grafico" },
  { id: 3, nombre: "Diseño Industrial" },
  { id: 4, nombre: "Matematicas" },
  { id: 5, nombre: "Geologia" },
  { id: 6, nombre: "Medicina" },
  { id: 7, nombre: "Enfermeria" },
  { id: 8, nombre: "Odontologia" },
  { id: 9, nombre: "Derecho" },
  { id: 10, nombre: "Ciencias Politicas y gobierno" },
  { id: 11, nombre: "Relaciones Internacionales" },
  { id: 12, nombre: "Licenciatura en Pedagogía Infantil " },
  { id: 13, nombre: "Licenciatura en Matemáticas" },
  { id: 14, nombre: "Licenciatura en Filosofía y Humanidades" },
  { id: 15, nombre: "Negocios Internacionales" },
  { id: 16, nombre: "Administración de Empresas" },
  { id: 17, nombre: "Contaduría Pública" },
  { id: 18, nombre: "Comunicación Social y Periodismo" },
  { id: 19, nombre: "Economía" },
  { id: 20, nombre: "Filosofía y Humanidades" },
  { id: 21, nombre: "Psicología" },
  { id: 22, nombre: "Ingeniería Civil" },
  { id: 23, nombre: "Ingeniería de Sistemas y Computación" },
  { id: 24, nombre: "Ingeniería Eléctrica" },
  { id: 25, nombre: "Ingeniería Electrónica" },
  { id: 26, nombre: "Ingeniería Industrial" },
  { id: 27, nombre: "Ingeniería Mecánica" },
  { id: 28, nombre: "Musica" }
]

const host = 'http://54.91.128.11:8000' // AWS
// const host = 'http://localhost:8001' // Localhost

class Forms extends Component {

  state = {
    success: false,
    collapse: true,
    fadeIn: true,
    timeout: 300,
    primer_nombre: '',
    segundo_nombre: '',
    apellidos: '',
    tipo_doc: '',
    no_doc: '',
    programa: '',
  };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade = () => {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  handelSubmit = async () => {
    const {
      codigo, primer_nombre, segundo_nombre, apellidos, tipo_doc, no_doc, programa
    } = this.state;
    console.log(this.state);
    const { student } = await axios.post(`${host}/new-student`, {
      codigo, primer_nombre, segundo_nombre, apellidos, tipo_doc, no_doc, programa
    })
      .then(res => res.data)
      .catch(e => e);
    if (student) {
      this.setState({ success: true });
    }
  };

  render() {
    const {
      success,
      codigo, primer_nombre, segundo_nombre, apellidos, no_doc, programa
    } = this.state;
    if (success) {
      return <Redirect to="/buscar-estudiante"/>
    }
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
                    <Col md="2">
                      <Label htmlFor="codigo">Código</Label>
                    </Col>
                    <Col xs="12" md="10" lg="4">
                      <Input type="number" id="codigo" name="codigo" value={codigo} onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="primer_nombre">Primer Nombre</Label>
                    </Col>
                    <Col xs="12" md="10" lg="4">
                      <Input type="text" id="primer_nombre" name="primer_nombre" value={primer_nombre} onChange={this.handleChange} />
                    </Col>
                    <Col md="2">
                      <Label htmlFor="segundo_nombre">Segundo Nombre</Label>
                    </Col>
                    <Col xs="12" md="10" lg="4">
                      <Input type="text" id="segundo_nombre" name="segundo_nombre" value={segundo_nombre} onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="apellidos">Apellidos</Label>
                    </Col>
                    <Col xs="12" md="10">
                      <Input type="text" id="apellidos" name="apellidos" value={apellidos} onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label>Tipo de documento</Label>
                    </Col>
                    <Col md="10" lg="4" className="d-flex justify-content-around">
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="tipo_doc_cc" name="tipo_doc" value="CC" onChange={this.handleChange} />
                        <Label check className="form-check-label" htmlFor="tipo_doc_cc">Cédula</Label>
                      </FormGroup>
                      <FormGroup check className="radio d-inline-flex">
                        <Input className="form-check-input" type="radio" id="tipo_doc_ti" name="tipo_doc" value="TI" onChange={this.handleChange} />
                        <Label check className="form-check-label" htmlFor="tipo_doc_ti">Tarjeta de Identidad</Label>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <Label htmlFor="no_doc">Número de documento</Label>
                    </Col>
                    <Col xs="12" md="10" lg="4">
                      <Input type="text" id="no_doc" name="no_doc" value={no_doc} onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="programa">Programa Académico</Label>
                    </Col>
                    <Col xs="12" md="10">
                      <Input type="select" name="programa" id="programa" value={programa} onChange={this.handleChange}>
                        <option value="">Seleccione Programa...</option>
                        {programas.map(p => <option key={p.id} value={p.nombre}>{p.nombre}</option>)}
                      </Input>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handelSubmit}><i className="fa fa-dot-circle-o"></i> Crear</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Forms;
