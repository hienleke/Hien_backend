const express = require('express');
const bodyParser = require('body-parser');
const wordRoutes = require('./controller/word_controller');
const { sequelize, testConnection } = require("./config/database");
const Word = require('./model/word'); // Import Word model
const DailyWord = require('./model/daily_game');

const app = express();
testConnection();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', wordRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
