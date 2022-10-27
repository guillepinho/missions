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

module.exports = { readMissionsData, writeNewMissionData };