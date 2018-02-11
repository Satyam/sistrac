import React from 'react';
import DataTable from './';

const example = () => (
  <DataTable
    hover
    bordered
    data={[
      { id: 1, nombre: 'Jose', apellido: 'Perez' },
      { id: 2, nombre: 'Juan', apellido: 'Palomo' },
    ]}
    keyName="id"
    onRowClick={(key, ev) =>
      console.log(
        'onRowClick',
        key,
        ev.target,
        ev.target.type,
        ev.target.nodeName,
      )
    }
  >
    <caption>este es el caption</caption>
    <DataTable.Col
      name="nombre"
      label="Nombre"
      sortable
      format={(value, row) => <a href={row.id}>{value}</a>}
    />
    <DataTable.Col
      name="apellido"
      label="Apellido"
      style={{ color: 'red' }}
      className="text-right"
      onCellClick={(...args) => console.log('onCellClick', ...args)}
    />
  </DataTable>
);

export default example;
