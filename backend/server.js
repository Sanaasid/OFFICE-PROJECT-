import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const { MONGO_URI, PORT = 5000 } = process.env;
if (!MONGO_URI) {
  console.error('MONGO_URI is required in .env');
  process.exit(1);
}

const seatSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  batch: { type: String, required: true },
  user: { type: String, required: true },
});

const Seat = mongoose.models.Seat || mongoose.model('Seat', seatSchema);

const bookingSchema = new mongoose.Schema({
  bookingId: String,
  seat: String,
  date: String,
  status: String,
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

const seedSeats = async () => {
  const seatStatuses = [
    'Occupied',
    'Occupied',
    'Released',
    'Blocked',
    'Available',
    'Occupied',
    'Released',
    'Blocked',
    'Available',
    'Occupied',
  ];

  const seats = seatStatuses.map((status, index) => ({
    number: index + 1,
    name: `Seat ${index + 1}`,
    status,
    batch: index < 5 ? 'Batch 1' : 'Batch 2',
    user: status === 'Available' ? 'Open desk' : `User ${index + 1}`,
  }));

  await Seat.insertMany(seats);
  return seats;
};

const initializeDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Atlas');

    const seatCount = await Seat.countDocuments();
    if (seatCount === 0) {
      await seedSeats();
      console.log('Seeded initial seat data');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

app.get('/api/seats', async (req, res) => {
  try {
    const seats = await Seat.find().sort('number');
    if (!seats.length) {
      const seeded = await seedSeats();
      return res.json(seeded);
    }
    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load seats' });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    if (!bookings.length) {
      const initialBookings = [
        { bookingId: 'BK-1128', seat: '12A', date: '2026-04-21', status: 'Confirmed' },
        { bookingId: 'BK-1142', seat: '07B', date: '2026-04-22', status: 'Occupied' },
        { bookingId: 'BK-1165', seat: '23C', date: '2026-04-23', status: 'Released' },
        { bookingId: 'BK-1190', seat: '18A', date: '2026-04-24', status: 'Blocked' },
      ];
      await Booking.insertMany(initialBookings);
      return res.json(initialBookings);
    }
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load bookings' });
  }
});

app.put('/api/seats/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const seat = await Seat.findByIdAndUpdate(id, updates, { new: true });
    if (!seat) return res.status(404).json({ error: 'Seat not found' });
    res.json(seat);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update seat' });
  }
});

app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', name: user.name, email: user.email });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server listening on http://localhost:${PORT}`);
  });
});
