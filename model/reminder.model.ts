import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
     email: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  scheduledTime: { type: Date, required: true },
  sent: { type: Boolean, default: false }
});

export default mongoose.model("Reminder",reminderSchema);