const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
const { loadPlanetsData } = require("../../models/planets/planets.model");

describe("Launches API", () => {
	beforeAll(async () => {
		await mongoConnect();
		await loadPlanetsData();
	});

	afterAll(async () => {
		await mongoDisconnect();
	});

	describe("Test GET /v1/launches", () => {
		test("it should respond with 200 success", async () => {
			const response = await request(app)
				.get("/v1/launches")
				.expect("Content-Type", /json/)
				.expect(200);
		});
	});

	describe("Test POST /v1/launches", () => {
		const sampleDataWithDate = {
			mission: "USS Test",
			rocket: "TEST 337-F",
			destination: "Kepler-62 f",
			launchDate: "January 1, 2027",
		};

		const sampleDataWithoutDate = {
			mission: "USS Test",
			rocket: "TEST 337-F",
			destination: "Kepler-62 f",
		};

		const sampleDataWithInvalidDate = {
			mission: "USS Test",
			rocket: "TEST 337-F",
			destination: "Kepler-62 f",
			launchDate: "test",
		};

		test("it should respond with 201 created", async () => {
			const response = await request(app)
				.post("/v1/launches")
				.send(sampleDataWithDate)
				.expect("Content-Type", /json/)
				.expect(201);

			const requestDate = new Date(
				sampleDataWithDate.launchDate
			).valueOf();
			const responseDate = new Date(response.body.launchDate).valueOf();

			expect(responseDate).toBe(requestDate);
			expect(response.body).toMatchObject(sampleDataWithoutDate);
		});

		test("it should catch missing required properties", async () => {
			const response = await request(app)
				.post("/v1/launches")
				.send(sampleDataWithoutDate)
				.expect("Content-Type", /json/)
				.expect(400);

			expect(response.body).toStrictEqual({
				error: "Missing required launch property.",
			});
		});

		test("it should catch invalid dates", async () => {
			const response = await request(app)
				.post("/v1/launches")
				.send(sampleDataWithInvalidDate)
				.expect("Content-Type", /json/)
				.expect(400);

			expect(response.body).toStrictEqual({
				error: "Invalid launch date.",
			});
		});
	});
});
