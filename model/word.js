const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');  // Import the sequelize instance

// Define the Word model
const Word = sequelize.define('Word', {
  // Define columns for the Word model
  word: {
    type: DataTypes.STRING,
    allowNull: false,  // This means the word cannot be null
    unique: true,      
  },

  length: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5, 
  },
}, {
  // Define the table name and prevent pluralization of the model name
  tableName: 'words',  // Explicitly set the table name to 'words'
    freezeTableName: true,
    timestamps: false,
    // Prevent Sequelize from pluralizing the model name
});

module.exports = Word;
