const { Sequelize } = require("sequelize");
const config = require("config");

// Create a Sequelize instance
const sequelize = new Sequelize(config.get("postgres.url"), {
    dialect: "postgres",
});

// Test the database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

sequelize.sync({ alter: true })
    .then(() => {
        console.log("Database synchronized.");
    })
    .catch((error) => {
        console.error("Error synchronizing database:", error);
    });

module.exports = {
    sequelize,
    testConnection,
};
