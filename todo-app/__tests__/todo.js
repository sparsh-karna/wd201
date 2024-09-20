const request = require("supertest");
const app = require("../app");
const db = require("../models/index");

let server, agent;

describe("Todo test suites", () => {
  beforeAll(async () => {
    console.log("Starting beforeAll");
    await db.sequelize.sync({ force: true }); // This will recreate the table
    console.log("Sync complete");
    server = app.listen(3000);
    agent = request.agent(server);
    console.log("Server started");
  });

  test("responds with json at /todos", async () => {
    console.log("Starting test");
    const response = await agent.post("/todos").send({
      title: "Test Todo",
      dueDate: new Date().toISOString().slice(0, 10),
      completed: false,
    });
    console.log("Response received:", response.status, response.body);
    expect(response.statusCode).toBe(201);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8",
    );
    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.id).toBeDefined();
  });

  test("Mark todo as completed", async () => {
    console.log("Starting test");
    const response = await agent.post("/todos").send({
      title: "Test Todo",
      dueDate: new Date().toISOString().slice(0, 10),
      completed: false,
    });
    console.log("Full response body:", response.body); // Add this line
    const parsedResponse = JSON.parse(response.text);
    const id = parsedResponse.id;
    expect(parsedResponse.completed).toBe(false);
    const markResponse = await agent.put(`/todos/${id}/markAsCompleted`);
    const parsedMarkResponse = JSON.parse(markResponse.text);
    expect(parsedMarkResponse.completed).toBe(true);
  });

  afterAll(async () => {
    console.log("Starting afterAll");
    server.close();
    console.log("Server closed");
    await db.sequelize.close();
  });
});
