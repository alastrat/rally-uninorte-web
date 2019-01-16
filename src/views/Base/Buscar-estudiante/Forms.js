import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import axios from 'axios';

const host = 'http://54.91.128.11:8000' // AWS
// const host = 'http://localhost:8001' // Localhost
class Forms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      viewTable: false,
      studentCode: '',
      studentsList: [],
      studentsCount: 0,
      checkedStudent: null,
      codigo: '',
      apellidos: '',
      tipo_doc: '',
      no_doc: ''
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  handleStudentCodeOnSubmit = async () => {
    let studentsList, studentsCount, viewTable;
    const {
      codigo, apellidos, no_doc
    } = this.state;   
    let searchQuery;

    if(codigo) searchQuery =`codigo=${codigo}`;
    if(apellidos) (searchQuery)? searchQuery+=`&apellidos=${apellidos}`: searchQuery =`apellidos=${apellidos}`;
    if(no_doc) (searchQuery)? searchQuery+=`&no_doc=${no_doc}`: searchQuery= `no_doc=${no_doc}`;
    
    const { students } = await axios.get(`${host}/find-students?${searchQuery}`)
      .then(res => res.data)
      .catch(e => e);

    if (!!students) {
      studentsList = students.students;
      studentsCount = students.stats.registros;
      viewTable = true
    } else {
      studentsList = [];
      studentsCount = 0;
      viewTable = false
    }

    this.setState({ studentsList, studentsCount, viewTable })
  };

  handleFieldsCleaning = async () => {
    this.setState({ codigo: '', apellidos: '', no_doc: '' })
  };

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  handleConfirmCheck = paramCode => async () => {
    let studentsList;

    const { student } = await axios.post(`${host}/checkin-student`, { codigo: paramCode })
      .then(res => res.data)
      .catch(e => e);
    this.setState({ checkedStudent: student });

    const {
      codigo, apellidos, no_doc
    } = this.state;   
    let searchQuery;

    if(codigo) searchQuery =`codigo=${codigo}`;
    if(apellidos) (searchQuery)? searchQuery+=`&apellidos=${apellidos}`: searchQuery =`apellidos=${apellidos}`;
    if(no_doc) (searchQuery)? searchQuery+=`&no_doc=${no_doc}`: searchQuery= `no_doc=${no_doc}`;
    
    const { students } = await axios.get(`${host}/find-students?${searchQuery}`)
      .then(res => res.data)
      .catch(e => e);
    if (!!students) {
      studentsList = students.students;
    } else {
      studentsList = [];
    }

    this.setState({ studentsList })
  };

  toggleModal = () => {
    this.setState({ checkedStudent: null });
  };

  render() {  
    const {
      checkedStudent,
      codigo, apellidos, no_doc
    } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Buscar</strong> Estudiantes
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
                      <Label htmlFor="apellidos">Apellidos</Label>
                    </Col>
                    <Col xs="12" md="10" lg="4">
                      <Input type="text" id="apellidos" name="apellidos" value={apellidos} onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="no_doc">Número de documento</Label>
                    </Col>
                    <Col xs="12" md="10" lg="4">
                      <Input type="text" id="no_doc" name="no_doc" value={no_doc} onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button style={{marginRight: 20}} type="submit" size="sm" color="primary" onClick={this.handleStudentCodeOnSubmit}><i className="fa fa-dot-circle-o"></i> Buscar</Button>
                <Button type="submit" size="sm" color="danger" onClick={this.handleFieldsCleaning}><i className="fa fa-dot-circle-o"></i> Borrar</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        {this.state.viewTable &&
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Listado Estudiantes {this.state.studentsCount}
                </CardHeader>
                <CardBody>
                  <Table hover bordered striped responsive size="sm">
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Apellidos</th>
                        <th>Primer Nombre</th>
                        <th>Segundo Nombre</th>
                        <th>Tipo Doc</th>
                        <th>No. Doc</th>
                        <th>Programa</th>
                        <th>Financiamiento</th>
                        <th>Asistencia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.studentsList.map((student) =>
                        <tr key={student._id}>
                          <td>{student.codigo}</td>
                          <td>{student.apellidos}</td>
                          <td>{student.primer_nombre}</td>
                          <td>{student.segundo_nombre}</td>
                          <td>{student.tipo_doc}</td>
                          <td>{student.no_doc}</td>
                          <td>{student.programa}</td>
                          <td>{student.financiamiento}</td>
                          <td>
                            {student.asistencia && <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                              {/* <Badge className="mr-1" href={`/#/estudiante/${student._id}`} color="success">✔</Badge> */}
                              <Button active block color="success" aria-pressed="true">✔</Button>
                            </Col>}
                            {!student.asistencia && <Button block color="danger" onClick={this.handleConfirmCheck(student.codigo)}>Confirmar</Button>}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                  {/* <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        }
        <Modal isOpen={Boolean(checkedStudent)} toggle={this.toggleModal}>
          <ModalHeader>Checkin</ModalHeader>
          <ModalBody>{checkedStudent && checkedStudent.equipo}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Forms;
