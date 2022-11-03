const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../src/app');
const connection = require('../../src/db/connection');
const mockMissions = require('./mockMissions');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa a rota de missions', function () {
  describe('GET /missions', function () {
    it('Retorna uma lista de missões', async function () {
      sinon.stub(connection, 'execute')
        .resolves([mockMissions]);

      const response = await chai.request(app)
        .get('/missions');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.haveOwnProperty('missions');
      expect(response.body.missions).to.be.instanceOf(Array);

      sinon.restore();
    });
  });

  describe('POST /missions', function () {
    const mockMission = {
      name: 'Trybe',
      year: '2022',
      country: 'Brasil',
      destination: 'Marte',
    };

    const mockId = 25;

    beforeEach(function () {
      sinon.stub(connection, 'execute')
        .onFirstCall()
          .resolves([{ insertId: mockId }])
        .onSecondCall()
          .resolves([{ id: mockId, ...mockMission }]);
    });

    afterEach(sinon.restore);

    it('Grava uma nova missão', async function () {
      const response = await chai
        .request(app)
        .post('/missions')
        .send(mockMission);

      expect(response.status).to.be.equal(201);
      expect(response.body).to.haveOwnProperty('mission');
      expect(response.body.mission).to.haveOwnProperty('id');
      expect(response.body.mission.name).to.be.equal(mockMission.name);
      expect(response.body.mission.year).to.be.equal(mockMission.year);
      expect(response.body.mission.country).to.be.equal(mockMission.country);
      expect(response.body.mission.destination).to.be.equal(mockMission.destination);
    });

    it('Escreve a nova missão no banco de dados', async function () {
      await chai.request(app)
        .post('/missions')
        .send(mockMission);

      expect(connection.execute.calledTwice).to.be.equal(true);
    });
  });
});