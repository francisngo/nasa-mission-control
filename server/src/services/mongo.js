require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
	console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (error) => {
	console.error(`Error connecting to MongoDB: ${error}`);
});

async function mongoConnect() {
	await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
	await mongoose.connection.close();
}

module.exports = {
	mongoConnect,
	mongoDisconnect,
};
