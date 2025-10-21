import cron from "node-cron";
import Reminder from "../model/reminder.model";
import { sendEmail } from "./emailSender.util";

export const startScheduler = () => {
  cron.schedule("* * * * *", async () => {  // Runs every minute
    const now = new Date();
    console.log("Checking reminders at:", now.toISOString());

    const reminders = await Reminder.find({
      scheduledTime: { $lte: now },
      sent: false,
    });

    for (let reminder of reminders) {
      try {
        await sendEmail(reminder.email, reminder.title, reminder.message);
        reminder.sent = true;
        await reminder.save();
        console.log(`✅ Email sent to ${reminder.email}`);
      } catch (error) {
        console.error(`❌ Failed to send email to ${reminder.email}:`, error);
      }
    }
  });

  console.log("🕓 Reminder scheduler started...");
};
