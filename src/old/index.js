const readline = require('readline-sync');
const { readMissionsData, writeNewMissionData } = require('../utils/fsUtils');

async function main() {
  const name = readline.question('Qual é o nome da missão?');
  const year = readline.questionInt('Qual é o ano da missão?');
  const country = readline.question('Qual é o país da missão?');
  const destination = readline.question('Qual é o destino da missão?');

  const getId = await readMissionsData();
  const id = getId.length;
 
  const newMission = {
    id,
    name,
    year,
    country,
    destination,
  };

  await writeNewMissionData(newMission);
  const missions = await readMissionsData();
  console.log(missions);
}

main();