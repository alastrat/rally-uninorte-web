import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Progress,
  Row,
  Table,
} from 'reactstrap';

import axios from 'axios';
const host = 'http://54.91.128.11:8000' // AWS
// const host = 'http://localhost:8001' // Localhost

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      teams: []
    };
    this.fetchTeamsInfo();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  async fetchTeamsInfo() {
    const { equipos } = await axios.post(`${host}/results-teams`)
      .then(res => res.data)
      .catch(e => e);
    this.setState({ teams: equipos })
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Colores y Estudiantes
              </CardHeader>
              <CardBody>
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center"><i className="icon-people"></i></th>
                      <th>Color</th>
                      <th>Relación %</th>
                      <th>Estudiantes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.teams.map(team => (
                      <tr
                      key={team._id}
                      >
                        <td className="text-center">
                          <div className="avatar">
                            <img src={team.identifier} className="img-avatar" alt="admin@bootstrapmaster.com" />
                            <span className="avatar-status badge-success"></span>
                          </div>
                        </td>
                        <td>
                          <div>{team.name}</div>
                        </td>
                        <td>
                          <div className="clearfix">
                            <div className="float-left">
                              <strong>{team.ratio*100}%</strong>
                            </div>
                          </div>
                          <Progress className="progress-xs" color="success" value={team.members / 1600} />
                        </td>
                        <td>
                          <div className="small text-muted">Last login</div>
                          <strong>{team.members}</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
