import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import reminderRoutes from "./router/reminder.routes";
import { startScheduler } from "./utils/scheduler.util";

dotenv.config();

const app = express();
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("❌ MONGO_URI is not defined in environment variables.");
}

mongoose.connect(mongoUri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

app.use("/api/reminders", reminderRoutes);

startScheduler(); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
