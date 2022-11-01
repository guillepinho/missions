const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = '../../data/missions.json';

async function readMissionsData() {
  const data = await fs.readFile(
    path.resolve(__dirname, DATA_PATH),
  );
  const missions = JSON.parse(data);
  return missions;
}

function getHighestId(array) {
  let highestID = array[0].id;
  array.forEach((each) => {
    if (each.id > highestID) highestID = each.id;
  });
  return highestID;
}

async function writeNewMissionData(newMission) {
  const oldMissions = await readMissionsData();

  const allMissions = [...oldMissions, newMission];
  await fs.writeFile(
    path.resolve(__dirname, DATA_PATH),
    JSON.stringify(allMissions),
  );
}

async function updateMissionData(id, updatedMissionData) {
  const oldMissions = await readMissionsData();
  const updateMission = { id, ...updatedMissionData };

  const updatedMissions = oldMissions.reduce((missionList, currentMission) => {
    if (currentMission.id === updateMission.id) return [...missionList, updateMission];
    return [...missionList, currentMission];
  }, []);

  await fs.writeFile(
    path.resolve(__dirname, DATA_PATH),
    JSON.stringify(updatedMissions),
  );
}

async function deleteMissionData(id) {
  const oldMissions = await readMissionsData();
  const newArrayOfMissions = oldMissions.filter(({ id: eachId }) => id !== eachId);

  await fs.writeFile(
    path.resolve(__dirname, DATA_PATH),
    JSON.stringify(newArrayOfMissions),
  );
}

module.exports = {
  readMissionsData,
  writeNewMissionData,
  updateMissionData,
  deleteMissionData,
  getHighestId,
};