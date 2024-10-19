import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const environment = process.env.NODE_ENV;

async function userSeed() {

}

async function adminSeed() {

}

async function blogSeed() {

}

async function suggestionSeed() {

}

async function eventSeed() {

}

async function sponsorSeed() {

}

async function registrationSeed() {

}

async function main() {
  console.log('Seed data created successfully');
  if (environment === "development") {
    userSeed();
    adminSeed();
    blogSeed();
    eventSeed();
    sponsorSeed();
    registrationSeed();
    suggestionSeed();
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
