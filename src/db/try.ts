import { faker } from "@faker-js/faker";

const startTime = faker.date.future();
const endTime = new Date(startTime);
endTime.setHours(endTime.getHours() + 3);

const record = {
  name: faker.lorem.sentence(),
  startTime: startTime,
  endTime: endTime,
  guests: ["Bill Gates", "Steve Jobs", "Sam Altman"],
  venue: "Amriteshwari Hall",
  tags: faker.lorem.words(3).split(" "),
  status: faker.helpers.arrayElement(["Draft", "Published"]),
  entry: "Free",
  mode: faker.helpers.arrayElement(["Online", "Offline"]),
  eventFee: 0,
};

console.log(record);
