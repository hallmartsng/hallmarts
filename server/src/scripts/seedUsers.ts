import mongoose from 'mongoose';

import dotenv from 'dotenv';
import { User } from '../models/user.model';
dotenv.config();

async function seedUsers() {
  const mongoURI = process.env['MONGODB_URI']!;
  try {
    await mongoose.connect(mongoURI);

    await User.create([
      {
        email: 'admin@spacedezyn.com',
        password: 'admin123',
        role: 'admin',
      },
      {
        email: 'tega@spacedezyn.com',
        password: 'tega123',
        role: 'supervisor',
      },
    ]);

    console.log('✅ Users created successfully');
  } catch (err) {
    console.error('❌ Error seeding users:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seedUsers();
