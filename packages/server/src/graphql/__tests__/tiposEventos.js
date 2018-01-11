import { resolve } from 'path';
import buildSchema from '../../utils/buildSchema';

import { tester } from './__ignore/testUtils';

describe('graphsql -  tiposEventos', () => {
  let resolver;
  beforeAll(() => {
    resolver = tester(buildSchema(resolve(__dirname, '..')));
  });
  it('list eventos', async () => {
    const { validate, errors, data, sql } = await resolver(`
      {
        tiposEventos {
          idTipoEvento
          descr
          preposicion
        }
      }
    `);
    expect(validate).toBeUndefined();
    expect(errors).toBeUndefined();
    expect(data).toEqual({
      tiposEventos: [
        { descr: 'Sale de terminal', idTipoEvento: 1, preposicion: 'de' },
        { descr: 'Llega', idTipoEvento: 2, preposicion: 'a' },
        { descr: 'Sale', idTipoEvento: 3, preposicion: 'de' },
      ],
    });
    expect(sql).toEqual(['select * from TipoEvento']);
  });
  it('tipoEvento 1', async () => {
    const { validate, errors, data, sql } = await resolver(`
    {
      tipoEvento(idTipoEvento: 1) {
        idTipoEvento
        descr
        preposicion
      }
    }
    `);
    expect(validate).toBeUndefined();
    expect(errors).toBeUndefined();
    expect(data).toEqual({
      tipoEvento: {
        descr: 'Sale de terminal',
        idTipoEvento: 1,
        preposicion: 'de',
      },
    });
    expect(sql).toEqual(['select * from TipoEvento where idTipoEvento = 1']);
  });
});
