const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Load .env.local variables manually
const envPath = path.join(__dirname, '..', '.env.local');
let uri = 'mongodb://localhost:27017/adnan_portfolio';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/MONGODB_URI=(.*)/);
  if (match && match[1]) {
    uri = match[1].trim();
  }
}

const adminUser = {
  name: 'Ahamed Aboo Adnan',
  email: 'admin@example.com',
  password: 'adminpassword123', // Raw password to be hashed
  is_admin: true,
};

async function seed() {
  console.log(`Connecting to MongoDB at: ${uri}`);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    const usersCollection = db.collection('users');

    // Check if admin already exists
    const existing = await usersCollection.findOne({ email: adminUser.email });
    if (existing) {
      console.log(`User with email "${adminUser.email}" already exists. Seeding skipped.`);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminUser.password, 12);

    const result = await usersCollection.insertOne({
      name: adminUser.name,
      email: adminUser.email,
      password: hashedPassword,
      is_admin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('\n--- Admin Seeding Completed ---');
    console.log(`User ID:  ${result.insertedId}`);
    console.log(`Name:     ${adminUser.name}`);
    console.log(`Email:    ${adminUser.email}`);
    console.log(`Password: ${adminUser.password}`);
    console.log('--------------------------------\n');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await client.close();
  }
}

seed();
