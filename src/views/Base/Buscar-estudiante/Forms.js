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
  Table
} from 'reactstrap';
import axios from 'axios';


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
      studentsCount: 0
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
    const { students } = await axios.get(`http://localhost:8001/find-students?codigo=${e.target.value}`)
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

  showStudentsList = () => async () => {
    let studentsList, studentsCount, viewTable;
    // const { students } = await axios.get(`http://localhost:8001/find-students?codigo=${this.state.studentCode}`)
    //   .then(res => res.data)
    //   .catch(e => e);
    // console.log('-students-> ', students)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Buscar</strong> Estudiantes {this.state.studentsCount}
              </CardHeader>
              <CardBody>
                <Form action="" method="post" inline>
                  <FormGroup className="pr-1">
                    <Label htmlFor="codigo" className="pr-1">Código</Label>
                    <Input type="text" id="codigo" value={this.state.studentCode} onChange={this.handleStudentCodeOnChange()} placeholder="Ingrese código del estudiante" required />
                  </FormGroup>
                  {/* <FormGroup className="pr-1">
                    <Label htmlFor="exampleInputEmail2" className="pr-1">Email</Label>
                    <Input type="email" id="exampleInputEmail2" placeholder="jane.doe@example.com" required />
                  </FormGroup> */}
                </Form>
              </CardBody>
              <CardFooter>
                <Button onClick={this.showStudentsList()} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Buscar</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        {this.state.viewTable &&
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Listado Estudiantes
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
                        <th>Check</th>
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
                          <td>
                            <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                              <Button active block color="info" aria-pressed="true">✔</Button>
                            </Col>
                            {/* <Badge color="danger">Confirmar Asistencia</Badge> */}
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
      </div>
    );
  }
}

export default Forms;
