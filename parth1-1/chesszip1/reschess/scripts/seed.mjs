import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('No MONGODB_URI'); process.exit(1); }

const AccountSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
  name: String,
  role: String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Account = mongoose.models.Account || mongoose.model('Account', AccountSchema);

await mongoose.connect(MONGODB_URI);
console.log('Connected to MongoDB');

const accounts = [
  { email: 'admin@ica.com',   password: 'Admin@1234',   name: 'ICA Admin',      role: 'ADMIN'    },
  { email: 'coach@ica.com',   password: 'Coach@1234',   name: 'Arjun Sharma',   role: 'COACH'    },
  { email: 'student@ica.com', password: 'Student@1234', name: 'Rahul Verma',    role: 'CUSTOMER' },
];

for (const acc of accounts) {
  const exists = await Account.findOne({ email: acc.email });
  if (exists) {
    console.log(`Already exists: ${acc.email}`);
    continue;
  }
  const passwordHash = await bcrypt.hash(acc.password, 12);
  await Account.create({ email: acc.email, passwordHash, name: acc.name, role: acc.role });
  console.log(`Created: ${acc.email} (${acc.role}) — password: ${acc.password}`);
}

await mongoose.disconnect();
console.log('\nSeed complete!');
console.log('\nTest credentials:');
accounts.forEach(a => console.log(`  ${a.role}: ${a.email} / ${a.password}`));
