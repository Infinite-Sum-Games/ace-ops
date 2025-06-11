import { PrismaClient, AdminRole, EventEntry, EventMode, Status } from '@prisma/client';
import { faker } from "@faker-js/faker";
import * as fs from "node:fs";

const prisma = new PrismaClient();
const environment = process.env.NODE_ENV;

async function userSeed() {
  const users = [];

  for (let i = 0; i < 100; i++) {
    users.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(), password: faker.internet.password(),
      organization: faker.company.name(),
      designation: faker.helpers.arrayElement(['Student', 'Professional']),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    });
  }

  await prisma.user.createMany({
    data: users
  });
}

async function adminSeed() {

  const admins = [];

  for (let i = 0; i < 5; i++) {
    admins.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      department: "Computer Science and Engineering",
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement([AdminRole.Student, AdminRole.Faculty]),
      isActive: true,
    });
  }

  // Handle department and email at an API level
  admins.push({
    firstName: "Ritesh",
    lastName: "Koushik",
    department: "Computer Science and Engineering",
    email: "cb.en.u4cse22038@cb.students.amrita.edu",
    password: "password123",
    role: AdminRole.Student,
    isActive: true,
  });

  await prisma.admin.createMany({
    data: admins
  });
}

async function blogSeed() {

  const blogs = [];
  const markdownContent = fs.readFileSync("./src/db/blog-sample.md", "utf-8");

  for (let i = 0; i < 10; i++) {
    blogs.push({
      title: faker.lorem.sentence(),
      displayURL: faker.internet.url(),
      blurb: faker.lorem.sentence(),
      content: markdownContent,
      author: faker.person.firstName() + " " + faker.person.lastName(),
      tags: faker.lorem.words(3).split(' '),
      status: faker.helpers.arrayElement([Status.Draft, Status.Published]),
      publishedOn: faker.date.past()
    });
  }

  await prisma.blogs.createMany({
    data: blogs,
  });
}

async function eventSeed() {
  const events = [];

  for (let i = 0; i < 10; i++) {

    // Preliminary setup
    const startTime = faker.date.future();
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 3);

    events.push({
      name: faker.lorem.sentence(),
      startTime: startTime,
      endTime: endTime,
      guests: ["Bill Gates", "Steve Jobs", "Sam Altman"],
      venue: "Amriteshwari Hall",
      tags: faker.lorem.words(3).split(" "),
      status: faker.helpers.arrayElement([Status.Draft, Status.Published]),
      entry: EventEntry.Free,
      mode: faker.helpers.arrayElement([EventMode.Offline, EventMode.Online, EventMode.Hybrid]),
      eventFee: 0,
    });
  }

  await prisma.event.createMany({
    data: events,
  });
}

async function suggestionSeed() {

}

async function sponsorSeed() {

}

async function registrationSeed() {

}

async function main() {
  console.log('Seed data created successfully');
  if (environment === "development") {
    await userSeed();
    await adminSeed();
    await blogSeed();
    await eventSeed();
    await sponsorSeed();
    await registrationSeed();
    await suggestionSeed();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
