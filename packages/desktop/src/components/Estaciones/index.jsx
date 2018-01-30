import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Table from '@devasatyam/controls/lib/Table';
import { Grid, Row, Col } from '@devasatyam/controls/lib/Grid';
import { Button } from '@devasatyam/controls/lib/Button';
import SortDesc from 'react-icons/lib/fa/sort-alpha-desc';
import SortAsc from 'react-icons/lib/fa/sort-alpha-asc';
import Plus from 'react-icons/lib/go/plus';
import { Helmet } from 'react-helmet';
import isPlainClick from '_components/utils/isPlainClick';
import { estacionShape } from '_src/shapes';

import './styles.css';

export default class Estaciones extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      sortField: props.sortField || 'nombre',
      sortAsc: props.sortAsc || true,
    };
  }
  changeSort = ev => {
    if (!isPlainClick(ev)) return;
    const { sortField, sortAsc } = this.state;
    const name = ev.target.getAttribute('name');
    if (name === sortField) {
      this.setState({ sortAsc: !sortAsc });
    } else {
      this.setState({ sortField: name });
    }
  };
  getEstacionesSorted = () => {
    const { sortField, sortAsc } = this.state;
    const { estaciones } = this.props;
    if (!estaciones) return [];
    return estaciones.concat().sort((a, b) => {
      let r = 0;
      if (a[sortField] < b[sortField]) r = -1;
      else if (a[sortField] > b[sortField]) r = 1;
      return sortAsc ? r : -r;
    });
  };
  addEstacion = () => {
    const { history } = this.props;
    history.push('/estacion/editEstacion');
  };
  render() {
    const { sortField, sortAsc } = this.state;
    const estaciones = this.getEstacionesSorted();
    const th = (name, label) => (
      <th onClick={this.changeSort} name={name}>
        <span>
          {sortField === name && (sortAsc ? <SortAsc /> : <SortDesc />)}
        </span>
        {label}
      </th>
    );
    return (
      <Grid>
        <Helmet>
          <title>Sistrac - estaciones</title>
        </Helmet>,
        <Row>
          <Col mdOffset={2} md={8} xs={12}>
            <Button className="addButton" onClick={this.addEstacion}>
              <Plus /> Add
            </Button>
            <Table striped bordered condensed hover>
              <thead style={{ cursor: 'default' }}>
                <tr>
                  {th('sigla', 'Sigla')}
                  {th('nombre', 'Nombre')}
                </tr>
              </thead>
              <tbody>
                {estaciones.map(est => (
                  <tr key={est.idEstacion}>
                    <td>
                      <Link to={`/estacion/${est.idEstacion}`}>
                        {est.idEstacion}
                      </Link>
                    </td>
                    <td>{est.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Estaciones.propTypes = {
  estaciones: PropTypes.arrayOf(estacionShape),
};
