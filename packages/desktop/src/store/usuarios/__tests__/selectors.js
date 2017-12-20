import { selUsuarioActivo } from '../selectors';
/*
export function selUsuarioActivo(state) {
  const usuarios = state[NAME];
  if (usuarios.vence < Date.now()) return {};
  if (!usuarios.activo) return {};
  return usuarios.hash[usuarios.activo];
}
*/
import { SESSION_TIMEOUT } from '../../../config';

import { NAME } from '../constants';

const usuario = {
  idUsuario: 20,
  usuario: 'pepe',
  password: '123456789',
  nombre: 'José Pérez',
};

describe('selectors usuario', () => {
  describe('selUsuarioActivo', () => {
    it('success', () => {
      const state = {
        [NAME]: {
          activo: usuario.idUsuario,
          hash: {
            [usuario.idUsuario]: usuario,
          },
          vence: Date.now() + SESSION_TIMEOUT * 1000,
        },
      };
      expect(selUsuarioActivo(state)).toEqual(usuario);
    });
    it('fail: no active user', () => {
      const state = {
        [NAME]: {
          activo: null,
          hash: {
            [usuario.idUsuario]: usuario,
          },
          vence: Date.now() + SESSION_TIMEOUT * 1000,
        },
      };
      expect(selUsuarioActivo(state)).toEqual({});
    });
    it('fail: timed out', () => {
      const state = {
        [NAME]: {
          activo: usuario.idUsuario,
          hash: {
            [usuario.idUsuario]: usuario,
          },
          vence: Date.now() - 9999,
        },
      };
      expect(selUsuarioActivo(state)).toEqual({});
    });
  });
});
