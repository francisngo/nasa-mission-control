require("dotenv").config();
const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./services/mongo");
const { loadPlanetsData } = require("./models/planets/planets.model");
const { loadLaunchesData } = require("./models/launches/launches.model");

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

(async () => {
	await mongoConnect();
	await loadPlanetsData();
	await loadLaunchesData();

	server.listen(PORT, () => {
		console.log(`Listening on port ${PORT}...`);
	});
})();
