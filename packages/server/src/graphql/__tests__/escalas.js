import { resolve } from 'path';

import { tester } from './__ignore/testUtils';
import buildSchema from '../../utils/buildSchema';

describe('graphsql -  escalas', () => {
  let resolver;
  beforeAll(() => {
    resolver = tester(buildSchema(resolve(__dirname, '..')));
  });
  it('escalas por estacion', async () => {
    const { validate, errors, data, sql } = await resolver(
      `
    { escalas(idEstacion: "RET") {
      idEscala
      orden
      sale
      llega
    }}
    `,
    );
    expect(validate).toBeUndefined();
    expect(errors).toBeUndefined();
    expect(data).toEqual({
      escalas: [{ idEscala: '1', llega: 0, orden: 1, sale: 0 }],
    });
    expect(sql).toEqual(["select * from Escalas where idEstacion = 'RET'"]);
  });
  it('escalas por itinerario', async () => {
    const { validate, errors, data, sql } = await resolver(
      `
    { escalas(idItinerario: 1) {
      idEscala
      orden
      sale
      llega
    }}
    `,
    );
    expect(validate).toBeUndefined();
    expect(errors).toBeUndefined();
    expect(data).toEqual({
      escalas: [
        { idEscala: '1', llega: 0, orden: 1, sale: 0 },
        {
          idEscala: '3',
          llega: 97,
          orden: 3,
          sale: 102,
        },
        { idEscala: '5', llega: 180, orden: 5, sale: 180 },
      ],
    });
    expect(sql).toEqual(['select * from Escalas where idItinerario = 1']);
  });
  it('escalas without arguments', async () => {
    const { validate, errors, data, sql } = await resolver(
      `
    { escalas {
      idEscala
      orden
      sale
      llega
    }}
    `,
    );
    expect(validate).toBeUndefined();
    expect(errors).toBeUndefined();
    expect(data).toEqual({
      escalas: [],
    });
    expect(sql).toEqual([]);
  });
  it('single escala with subordinates', async () => {
    const { validate, errors, data, sql } = await resolver(
      `
    { escala(idEscala:1) {
      idEscala
      estacion {
        nombre
        latitud
        longitud
      }
      itinerario {
        nombre
      }
      orden
      sale
      llega
    }}
    `,
    );
    expect(validate).toBeUndefined();
    expect(errors).toBeUndefined();
    expect(data).toEqual({
      escala: {
        estacion: {
          latitud: -34.590672,
          longitud: -58.377158,
          nombre: 'Retiro',
        },
        idEscala: '1',
        itinerario: { nombre: 'Retiro-Rosario' },
        llega: 0,
        orden: 1,
        sale: 0,
      },
    });
    expect(sql).toEqual([
      'select * from Escalas where idEscala = 1',
      "select * from Estaciones where idEstacion = 'RET'",
      'select * from Itinerarios where idItinerario = 1',
    ]);
  });
});
