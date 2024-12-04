const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 

const DailyGame = sequelize.define('DailyGame', {
  game_data: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'DailyGames',  // Explicitly set the table name to 'dailygame'
  freezeTableName: true,   // Disable pluralization of table names
  timestamps: false        // Disable automatic 'createdAt' and 'updatedAt' columns
});

module.exports = DailyGame;
