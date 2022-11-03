const express = require('express');
require('express-async-errors');

const {
  findAll, findById, insert,
  update, remove,
} = require('./db/missionsDb');

const app = express();

app.use(express.json());

const { validadeMissionData, validateMissionId } = require('./utils/validations');

const validateExistingId = async (req, res, next) => {
  const { id } = req.params;
  const missions = await findAll();
  if (missions.some((mission) => mission.id === Number(id))) {
    next();
  } else {
    res.status(400).send({ message: 'Bad Request. No existing ID.' });
  }
};

app.get('/missions', async (req, res) => {
  const missions = await findAll();
  return res.status(200).json({ missions });
});

app.get('/missions/:id', async (req, res) => {
  const { id } = req.params;
  const missions = await findById(id);
  return res.status(200).json({ missions });
});

app.post('/missions', validadeMissionData, async (req, res) => {
  const mission = req.body;
  const insertedMission = await insert(mission);
  return res.status(201).json({ mission: insertedMission });
});

app.put(
  '/missions/:id',
  validateMissionId,
  validateExistingId,
  validadeMissionData,
  async (req, res) => {
    const { id } = req.params;
    const updatedMissionData = req.body;
    const updatedMission = await update(Number(id), updatedMissionData);
    return res.status(201).json({ mission: updatedMission });
  },
);

app.delete('/missions/:id', validateMissionId, validateExistingId, async (req, res) => {
  const { id } = req.params;
  await remove(Number(id));

  return res.status(200).json({ message: `Mission with id ${id} was successfully terminated.` });
});

app.use((err, _req, _res, next) => {
  console.error(err.stack);
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(500).send({ message: `Who's bad? ${err}` });
});

module.exports = app;