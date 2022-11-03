const connection = require('./connection');
const conn = require('./connection');

const findAll = async () => {
  const [missions] = await conn.execute('SELECT * FROM missions');
  return missions;
};

const findById = async (id) => {
  const [mission] = await connection.execute(
    `SELECT * FROM missions
        WHERE id = ?`,
    [id],
  );
  return mission;
};

const insert = async ({ name, year, country, destination }) => {
  const [{ insertId }] = await conn.execute(
    `INSERT INTO missions
        (name, year, country, destination)
      VALUES
        (?, ?, ?, ?)`,
    [name, year, country, destination],
  );
  return findById(insertId);
};

const update = async (id, { name, year, country, destination }) => {
  await conn.execute(
    `UPDATE missions
      SET name = ?,
          year = ?,
          country = ?,
          destination = ? 
      WHERE id = ?`,
    [name, year, country, destination, id],
  );
  return findById(id);
};

const remove = async (id) => {
  await conn.execute(
    `DELETE FROM missions
      WHERE id = ?`,
    [id],
  );
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};