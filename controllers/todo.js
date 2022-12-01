const maria = require("../models");
const { Op } = require("sequelize");

exports.create = async (todo) => {
  return await maria.TODO_LIST.create(todo)
    .then((r) => r)
    .catch((e) => {
      throw new Error(e.toString());
    });
};

exports.between = async (from, to) => {
  return (
    (await maria.TODO_LIST.findAll({
      where: {
        DDAY: {
          [Op.and]: {
            [Op.gte]: new Date(from),
            [Op.lte]: new Date(to),
          },
        },
      },
    })) || []
  );
};

exports.at = async (day) => {
  return (
    (await maria.TODO_LIST.findAll({
      where: {
        DDAY: {
          [Op.eq]: new Date(day),
        },
      },
    })) || []
  );
};

exports.removeById = async (ID) => {
  await maria.TODO_LIST.destroy({
    where: {
      ID,
    },
  });
};

exports.removeByDay = async (day) => {
  await maria.TODO_LIST.destroy({
    where: {
      DDAY: {
        [Op.eq]: new Date(day),
      },
    },
  });
};

exports.updateToDo = async (ID, CONTENT) => {
  await maria.TODO_LIST.update(
    {
      CONTENT,
    },
    {
      where: {
        ID,
      },
    }
  );
};
