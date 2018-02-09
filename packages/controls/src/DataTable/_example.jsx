import React from 'react';
import DataTable from './';

const example = () => (
  <DataTable
    hover
    data={[
      { id: 1, nombre: 'Jose', apellido: 'Perez' },
      { id: 2, nombre: 'Juan', apellido: 'Palomo' },
    ]}
    keyName="id"
  >
    <DataTable.Col
      name="nombre"
      label="Nombre"
      sortable
      format={(value, row) => <a href={row.id}>{value}</a>}
    />
    <DataTable.Col name="apellido" label="Apellido" />
  </DataTable>
);

export default example;
