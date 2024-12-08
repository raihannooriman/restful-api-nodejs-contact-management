import supertest from "supertest";
import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

describe("POST /api/users", () => {

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can register new user", async () => {

    const result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "secret123",
      name: "Test",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Test");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should rejected if register is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should rejected if username already registered", async () => {

    let result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "secret123",
      name: "Test",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Test");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "secret123",
      name: "Test",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await removeTestUser();
  });
  it("should can login", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "secret123"
    });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get current user", async () => {
    const result = await supertest(web).get("/api/users/current").set("Authorization", "test");
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Test");
  });

  it("should reject if token is invalid", async () => {
    const result = await supertest(web).get("/api/users/current").set("Authorization", "salah");
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", () => {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can update user", async () => {
    const result = await supertest(web).patch("/api/users/current").set("authorization", "test").send({
      name: "Test Update",
      password: "rahasia123",
    });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Test Update");

    const user = await getTestUser();
    expect(await bcrypt.compare("rahasia123", user.password)).toBe(true);
  });

  it("should can update user name", async () => {
    const result = await supertest(web).patch("/api/users/current").set("authorization", "test").send({
      name: "Test Update",
    });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Test Update");
  });

  it("should can update user password", async () => {
    const result = await supertest(web).patch("/api/users/current").set("authorization", "test").send({
      password: "rahasia123",
    });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Test");

    const user = await getTestUser();
    expect(await bcrypt.compare("rahasia123", user.password)).toBe(true);
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web).patch("/api/users/current").set("authorization", "salah").send({});
    logger.info(result.body);
    expect(result.status).toBe(401);
  });
});

describe("DELETE /api/users/logout", () => {
  beforeEach(async () => {
    await createTestUser();
    });
    afterEach(async () => {
      await removeTestUser();
    });
  
  it("should can logout", async () => {
      const result = await supertest(web).delete("/api/users/logout").set("authorization", "test");
      expect(result.status).toBe(200);
      expect(result.body.data).toBe("OK");

      const user = await getTestUser();
      expect(user.token).toBeNull();
    });
});