import express from "express";
import { createReminder } from "../controller/reminder.controller";

const router = express.Router();

router.post("/", createReminder); // POST /api/reminders

export default router;
