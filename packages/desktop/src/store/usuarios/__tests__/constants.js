const C = require('../constants');
describe('constants usuarios', () => {
  it('', () => {
    const prefix = new RegExp('^' + C.NAME + ' / .+');
    Object.keys(C).forEach(k => {
      expect(k.toUpperCase()).toBe(k);
      if (k !== 'NAME') {
        expect(C[k]).toMatch(prefix);
      }
    });
  });
});
