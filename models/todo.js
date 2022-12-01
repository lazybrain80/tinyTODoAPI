"use strict";

module.exports = (sequelize, DataType) => {
  return [
    sequelize.define(
      "TODO_LIST",
      {
        ID: { type: DataType.BIGINT, primaryKey: true },
        DDAY: DataType.DATE,
        CONTENT: DataType.TEXT,
        CREATED: {
          field: "CREATED",
          type: DataType.DATE,
          allowNull: false,
          defaultValue: DataType.NOW,
        },
      },
      { timestamps: false }
    ),
  ];
};
