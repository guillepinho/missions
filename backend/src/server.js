require('dotenv').config();
const app = require('./app');
const connection = require('./db/connection');

const PORT = process.env.NODEJS_APP_PORT;

app.listen(PORT, async () => {
  console.log(`Our backend server is healthy and running on port ${PORT}!`);
  
  const [result] = await connection.execute('SELECT 1');
  if (result) {
    console.log('MySQL Server status is: ok');
  } else {
    console.log('MySQL Server status is: dead :(');
  }
});