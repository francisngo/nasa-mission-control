const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
const { loadPlanetsData } = require("../../models/planets/planets.model");

describe("Planets API", () => {
	beforeAll(async () => {
		await mongoConnect();
		await loadPlanetsData();
	});

	afterAll(async () => {
		await mongoDisconnect();
	});

	describe("Test GET /v1/planets", () => {
		test("it should respond with 200 success", async () => {
			const response = await request(app)
				.get("/v1/planets")
				.expect("Content-Type", /json/)
				.expect(200);
		});
	});
});
