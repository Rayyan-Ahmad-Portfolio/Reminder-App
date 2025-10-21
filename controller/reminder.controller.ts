import Reminder from "../model/reminder.model";
import { Request,Response } from "express";

export const createReminder = async (req:Request, res: Response) => {
  try {
    const { email, title, message, scheduledTime } = req.body;

    if (!email || !title || !message || !scheduledTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const reminder = new Reminder({
      email,
      title,
      message,
      scheduledTime: new Date(scheduledTime),
    });

    await reminder.save();

    res.status(201).json({
      success: true,
      message: "Reminder created successfully",
      reminder,
    });
  } catch (error) {
    console.error("Error creating reminder:", error);
    res.status(500).json({ message: "Server error" });
  }
};
