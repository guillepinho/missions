const { expect } = require('chai');
const { readMissionsData } = require('../../src/utils/fsUtils');

describe('A função readMissionsData', function () {
  it('Retorna um array', async function () {
    const missions = await readMissionsData();
    expect(missions).to.be.instanceOf(Array);
  });
});