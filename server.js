const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 🔹 Schema for Hotel Details
const hotelSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
});

const Hotel = mongoose.model("Hotel", hotelSchema);

// 🔹 Schema for Dining Menu
const diningSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
});

const Dining = mongoose.model("Dining", diningSchema);

// 🔹 Schema for Rooms
const roomSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  availability: Boolean,
});

const Room = mongoose.model("Room", roomSchema);

// 🔹 Schema for Gallery Images
const gallerySchema = new mongoose.Schema({
  imageUrl: String,
  description: String,
});

const Gallery = mongoose.model("Gallery", gallerySchema);

// 🔹 Schema for Contact Messages
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// ==========================================
// 📌 API Routes
// ==========================================

// 🔹 Get hotel details (About Section)
app.get("/about", async (req, res) => {
  try {
    const hotel = await Hotel.findOne();
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 Get dining menu (Dining Section)
app.get("/dining", async (req, res) => {
  try {
    const menu = await Dining.find();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 Place a food order (Place Order Section)
app.post("/order", async (req, res) => {
  try {
    const { items } = req.body; // Expecting an array of food items
    console.log(`New order received: ${JSON.stringify(items)}`);
    res.json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 Get available rooms (Rooms Section)
app.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find({ availability: true });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 Book a room (Booking Section)
app.post("/booking", async (req, res) => {
  try {
    const { name } = req.body;
    const room = await Room.findOne({ name });

    if (!room || !room.availability) {
      return res.status(400).json({ message: "Room not available" });
    }

    room.availability = false;
    await room.save();
    res.json({ message: "Room booked successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 Get gallery images (Gallery Section)
app.get("/gallery", async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 Contact hotel (Contact Section)
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.json({ message: "Your message has been received!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// Start the Server
// ==========================================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

