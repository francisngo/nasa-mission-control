const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { loadPlanetsData } = require("./models/planets/planets.model");

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
	console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (error) => {
	console.error(error);
});

async function startServer() {
	await mongoose.connect(MONGO_URL);
	await loadPlanetsData();

	server.listen(PORT, () => {
		console.log(`Listening on port ${PORT}...`);
	});
}

startServer();
