import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Glyphicon, Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Helmet } from 'react-helmet';

import initStore from '_components/utils/initStore';
import isPlainClick from '_components/utils/isPlainClick';
import { getEstaciones } from '_store/actions';
import { selEstaciones } from '_store/selectors';
import { estacionShape } from '_src/shapes';

export class Estaciones extends Component {
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
    console.log(sortField, sortAsc, name);
    if (name === sortField) {
      this.setState({ sortAsc: !sortAsc });
    } else {
      this.setState({ sortField: name });
    }
  };
  getEstacionesSorted = () => {
    const { sortField, sortAsc } = this.state;
    return this.props.estaciones.sort((a, b) => {
      let r = 0;
      if (a[sortField] < b[sortField]) r = -1;
      else if (a[sortField] > b[sortField]) r = 1;
      return sortAsc ? r : -r;
    });
  };
  render() {
    const { sortField, sortAsc } = this.state;
    const estaciones = this.getEstacionesSorted();
    const th = (name, label) => (
      <th onClick={this.changeSort} name={name}>
        <Glyphicon
          glyph={
            sortField === name
              ? sortAsc ? 'sort-by-alphabet' : 'sort-by-alphabet-alt'
              : ''
          }
        />
        {label}
      </th>
    );
    return (
      <Grid>
        <Helmet>
          <title>Sistrac</title>
        </Helmet>,
        <Row>
          <Col mdOffset={2} md={8} xs={12}>
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

export const storeInitializer = (dispatch, getState) =>
  selEstaciones(getState()).length || dispatch(getEstaciones());

export const mapStateToProps = state => ({ estaciones: selEstaciones(state) });

export default compose(initStore(storeInitializer), connect(mapStateToProps))(
  Estaciones,
);
