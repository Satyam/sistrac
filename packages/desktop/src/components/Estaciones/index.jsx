import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Glyphicon, Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Helmet } from 'react-helmet';
import initStore from '../utils/initStore';
import isPlainClick from '../utils/isPlainClick';
import { getEstaciones } from '../../store/actions';
import { selEstaciones } from '../../store/selectors';

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
    return (
      <Grid>
        <Helmet>
          <title>Sistrac</title>
        </Helmet>,
        <Row>
          <Col mdOffset={2} md={8}>
            <Table striped bordered condensed hover>
              <thead style={{ cursor: 'default' }}>
                <tr>
                  <th onClick={this.changeSort} name="nombre" width="75%">
                    {sortField === 'nombre' ? (
                      <Glyphicon
                        glyph={
                          sortAsc ? 'sort-by-alphabet' : 'sort-by-alphabet-alt'
                        }
                      />
                    ) : (
                      ' '
                    )}{' '}
                    Nombre
                  </th>
                  <th onClick={this.changeSort} name="sigla" width="25%">
                    {sortField === 'sigla' ? (
                      <Glyphicon
                        glyph={
                          sortAsc ? 'sort-by-alphabet' : 'sort-by-alphabet-alt'
                        }
                      />
                    ) : (
                      ' '
                    )}{' '}
                    Sigla
                  </th>
                </tr>
              </thead>
              <tbody>
                {estaciones.map(est => (
                  <tr key={est.idEstacion}>
                    <td>
                      <Link to={`/estacion/${est.idEstacion}`}>
                        {est.nombre}
                      </Link>
                    </td>
                    <td>{est.sigla}</td>
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

export const storeInitializer = dispatch => dispatch(getEstaciones());

export const mapStateToProps = state => ({ estaciones: selEstaciones(state) });

export default compose(initStore(storeInitializer), connect(mapStateToProps))(
  Estaciones,
);
