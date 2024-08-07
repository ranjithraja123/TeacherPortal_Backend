import mongoose from 'mongoose';
import faker from 'faker';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Students from './models/Students.js';

dotenv.config();

const seedDB = async () => {
  await connectDB();

  // Clear collections
  await Students.deleteMany({});

  // Create fake data
  for (let j = 0; j < 10; j++) {
    const user = new Students({
      name: faker.name.findName(),
      subject: faker.lorem.word(), // Adjusted from email to a more appropriate field
      mark: faker.datatype.number({ min: 0, max: 100 }) // Random number between 0 and 100
    });
    await user.save();
  }

  console.log('Database seeded');
  process.exit(0);
};

seedDB();
