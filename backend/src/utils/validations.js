const validateMissionId = (req, res, next) => {
  const { id } = req.params;
  const idAsNumber = Number(id);
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

module.exports = {
  validadeMissionData,
  validateMissionId,
};