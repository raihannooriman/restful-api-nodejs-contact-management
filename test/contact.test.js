import supertest from "supertest";
import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";
import {createTestUser, removeTestUser, removeAllTestContact, createTestContact, getTestContact, createManyTestContact} from "./test-util.js";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach( async () => {
    await removeAllTestContact();
    await removeTestUser();
  });
  it("should can create new contact", async () => {
    const result = await supertest(web).post("/api/contacts").set("Authorization", "test").send({
      first_name: "test",
      last_name: "test",
      email: "test@mail.com",
      phone: "62123456789"
    });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@mail.com");
    expect(result.body.data.phone).toBe("62123456789");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web).post("/api/contacts").set("Authorization", "test").send({
      first_name: "",
      last_name: "test",
      email: "test@mail.com",
      phone: "62123456789ssssssssssss"
    });
    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach( async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can get contact", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web).get("/api/contacts/" + testContact.id).set("Authorization", "test");
    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe(testContact.first_name);
    expect(result.body.data.last_name).toBe(testContact.last_name);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it("should return 404 if contact id not found", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web).get("/api/contacts/" + (testContact.id+1)).set("Authorization", "test");
    logger.info(result.body);
    
    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach( async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can update existing contact", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web).put("/api/contacts/" + testContact.id).set("Authorization", "test").send({
      first_name: "firsttest",
      last_name: "lasttest",
      email: "updatetest@mail.com",
      phone: "621234567890"
    });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe("firsttest");
    expect(result.body.data.last_name).toBe("lasttest");
    expect(result.body.data.email).toBe("updatetest@mail.com");
    expect(result.body.data.phone).toBe("621234567890");
  });

  it("should reject if request is invalid", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web).put("/api/contacts/" + testContact.id).set("Authorization", "test").send({
      first_name: "",
      last_name: "",
      email: "mail.com",
      phone: ""
    });
    logger.info(result.body);
    expect(result.status).toBe(400);
  });

  it("should reject if contact is not found", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web).put("/api/contacts/" + testContact.id+1).set("Authorization", "test").send({
      first_name: "firsttest",
      last_name: "lasttest",
      email: "updatetest@mail.com",
      phone: "621234567890"
    });
    logger.info(result.body);
    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach( async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can delete contact", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web).delete("/api/contacts/" + testContact.id).set("Authorization", "test");
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testContact = await getTestContact();
    expect(testContact).toBeNull();
  });

  it("should reject if contact not found", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web).delete("/api/contacts/" + (testContact.id +1)).set("Authorization", "test");
    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts", () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
  });
  afterEach( async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web).get("/api/contacts").set("Authorization", "test");
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web).get("/api/contacts").query({page: 2}).set("Authorization", "test");
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search using name", async () => {
    const result = await supertest(web).get("/api/contacts").query({name: "test 1"}).set("Authorization", "test");
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using email", async () => {
    const result = await supertest(web).get("/api/contacts").query({email: "test1"}).set("Authorization", "test");
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using phone", async () => {
    const result = await supertest(web).get("/api/contacts").query({phone: "628123456781"}).set("Authorization", "test");
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });
});