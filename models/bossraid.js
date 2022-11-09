"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bossRaid extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "userId",
      });
    }
  }
  bossRaid.init(
    {
      raidRecordId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      level: DataTypes.NUMBER,
      score: DataTypes.NUMBER,
      status: DataTypes.STRING,
      enterTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "bossRaid",
    }
  );
  return bossRaid;
};
