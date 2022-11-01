const express = require('express');

const {
  readMissionsData,
  writeNewMissionData,
  updateMissionData,
  deleteMissionData,
  getHighestId,
} = require('./utils/fsUtils');

const app = express();

app.use(express.json());

const validateMissionId = (req, res, next) => {
  const { id } = req.params;
  const idAsNumber = Number(id);
  console.log(idAsNumber);
  console.log(Number.isNaN(idAsNumber));
  if (Number.isNaN(idAsNumber)) {
    return res.status(400).send({ message: 'Bad Request. Invalid ID.' });
  }
  next();
};

const validadeMissionData = (req, res, next) => {
  const requiredProperties = ['name', 'year', 'country', 'destination'];
  if (requiredProperties.every((property) => property in req.body)) {
    next();
  } else {
    res.status(400).send({
      message: 'Bad Request. Invalid body (name, year, country, destination)',
    });
  }
};

const validateExistingId = async (req, res, next) => {
  const { id } = req.params;
  const missions = await readMissionsData();
  if (missions.some((mission) => mission.id === Number(id))) {
    next();
  } else {
    res.status(400).send({ message: 'Bad Request. No existing ID.' });
  }
};

app.get('/missions', async (req, res) => {
  const missions = await readMissionsData();
  return res.status(200).json({ missions });
});

app.post('/missions', validadeMissionData, async (req, res) => {
  const missionBody = req.body;
  const missions = await readMissionsData();
  const highestID = getHighestId(missions);
  const newMission = {
    id: highestID + 1,
    ...missionBody,
  };
  await writeNewMissionData(newMission);
  return res.status(201).json({ mission: newMission });
});

app.put(
'/missions/:id', 
validateMissionId,
validateExistingId,
validadeMissionData, 
async (req, res) => {
  const { id } = req.params;
  const updatedMissionData = req.body;
  const updatedMission = await updateMissionData(Number(id), updatedMissionData);
  return res.status(201).json({ mission: updatedMission });
},
);

app.delete('/missions/:id', validateMissionId, validateExistingId, async (req, res) => {
  const { id } = req.params;
  await deleteMissionData(Number(id));

  return res.status(204).end();
});

module.exports = app;