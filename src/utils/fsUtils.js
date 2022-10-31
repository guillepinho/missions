const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = '../../data/missions.json';

async function readMissionsData() {
  try {
    const data = await fs.readFile(
      path.resolve(__dirname, DATA_PATH),
    );
    const missions = JSON.parse(data);
    return missions;
  } catch (e) {
    console.log(`Erro na leitura do arquivo: ${e.message}`);
  }
}

function getHighestId(array) {
  let highestID = array[0].id;
  array.forEach((each) => {
    if (each.id > highestID) highestID = each.id;
  });
  return highestID;
}

async function writeNewMissionData(newMission) {
  try {
    const oldMissions = await readMissionsData();

    const allMissions = [...oldMissions, newMission];
    await fs.writeFile(
      path.resolve(__dirname, DATA_PATH),
      JSON.stringify(allMissions),
    );
  } catch (e) {
    console.log(e);
  }
}

async function updateMissionData(id, updatedMissionData) {
  const oldMissions = await readMissionsData();
  const updateMission = { id, ...updatedMissionData };

  const updatedMissions = oldMissions.reduce((missionList, currentMission) => {
    if (currentMission.id === updateMission.id) return [...missionList, updateMission];
    return [...missionList, currentMission];
  }, []);

  try {
    await fs.writeFile(
      path.resolve(__dirname, DATA_PATH),
      JSON.stringify(updatedMissions),
    );
  } catch (e) {
    console.log(e);
  }
}

async function deleteMissionData(id) {
  const oldMissions = await readMissionsData();
  const newArrayOfMissions = oldMissions.filter(({ id: eachId }) => id !== eachId);

  try {
    await fs.writeFile(
      path.resolve(__dirname, DATA_PATH),
      JSON.stringify(newArrayOfMissions),
    );
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  readMissionsData,
  writeNewMissionData,
  updateMissionData,
  deleteMissionData,
  getHighestId,
};