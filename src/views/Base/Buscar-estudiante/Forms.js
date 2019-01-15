import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
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
let searchQuery;

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
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  handleStudentCodeOnChange = () => async (e) => {
    let studentsList, studentsCount, viewTable;
    this.setState({ studentCode: e.target.value });
    searchQuery = e.target.value;
    const { students } = await axios.get(`${host}/find-students?codigo=${searchQuery}`)
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
  }

  handleConfirmCheck = codigo => async () => {
    let studentsList;
    const { student } = await axios.post(`${host}/checkin-student`, { codigo })
      .then(res => res.data)
      .catch(e => e);
    this.setState({ checkedStudent: student });
    const { students } = await axios.get(`${host}/find-students?codigo=${searchQuery}`)
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
    const { checkedStudent } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Buscar</strong> Estudiantes
              </CardHeader>
              <CardBody>
                <Form action="" method="post" inline>
                  <FormGroup className="pr-1">
                    <Label htmlFor="codigo" className="pr-1">Código</Label>
                    <Input type="text" id="codigo" value={this.state.studentCode} onChange={this.handleStudentCodeOnChange()} placeholder="Ingrese código del estudiante" required />
                  </FormGroup>
                </Form>
              </CardBody>
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
                        <th>Financiación</th>
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
                          <td>ICETEX</td>
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
