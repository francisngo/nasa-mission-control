const launches = require("./launches.mongo");
const planets = require("../planets/planets.mongo");
const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
	flightNumber: 100,
	mission: "Kepler Exploration X",
	rocket: "Explore IS1",
	launchDate: new Date("December 27, 2030"),
	destination: "Kepler-442 b",
	customers: ["Space X", "NASA"],
	upcoming: true,
	success: true,
};

saveLaunch(launch);

async function existsLaunchWithId(launchId) {
	return await launches.findOne({
		flightNumber: launchId,
	});
}

async function getLaunches() {
	return await launches.find({}, { _id: 0, __v: 0 });
}

async function getLatestFlightNumber() {
	const latestLaunch = await launches.findOne().sort("-flightNumber");
	return !latestLaunch ? DEFAULT_FLIGHT_NUMBER : latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
	await launches.findOneAndUpdate(
		{
			flightNumber: launch.flightNumber,
		},
		launch,
		{
			upsert: true,
		}
	);
}

async function updateLaunch(launch) {
	const planet = await planets.findOne({
		keplerName: launch.destination,
	});

	// referential integrity - https://en.wikipedia.org/wiki/Referential_integrity
	if (!planet) {
		throw new Error("No matching planet found.");
	}

	const newFlightNumber = (await getLatestFlightNumber()) + 1;
	const newLaunch = Object.assign(launch, {
		success: true,
		upcoming: true,
		customers: ["Space X", "NASA"],
		flightNumber: newFlightNumber,
	});

	await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
	const aborted = await launches.updateOne(
		{
			flightNumber: launchId,
		},
		{
			upcoming: false,
			success: false,
		}
	);
	return aborted.modifiedCount === 1;
}

module.exports = {
	getLaunches,
	saveLaunch,
	updateLaunch,
	existsLaunchWithId,
	abortLaunchById,
};
