import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => [
  await prismaClient.user.deleteMany({
    where: {
      username: "test"
    }
  })
];

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("secret123", 10),
      name: "Test",
      token: "test"
    }
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test"
    }
  });
};

export const removeAllTestContact = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: "test"
    }
  });
};

export const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      username: "test",
      first_name: "test",
      last_name: "test",
      email: "test@mail.com",
      phone: "62123456789"
    }
  });
};

export const createManyTestContact = async () => {
  for (let i = 0; i < 15; i++){
    await prismaClient.contact.create({
      data: {
        username: `test`,
        first_name: `test ${i}`,
        last_name: `test ${i}`,
        email: `test${i}@mail.com`,
        phone: `62812345678${i}`
      }
    });
  }
};

export const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: "test"
    }
  });
};

export const removeAllTestAddresses = async () => {
  await prismaClient.address.deleteMany({
    where: {
      contact: {
        username: "test"
      }
    }
  });
};

export const createTestAddress = async () => {
  const contact = await getTestContact();
  await prismaClient.address.create({
    data: {
      contact_id: contact.id,
      street: "Jalan Test",
      city: "Kota Test",
      province: "Provinsi Test",
      country: "Indonesia",
      postal_code: "123456"
    }
  });
};

export const getTestAddress = async () => {
  return prismaClient.address.findFirst({
    where: {
      contact: {
        username: "test"
      }
    }
  });
};