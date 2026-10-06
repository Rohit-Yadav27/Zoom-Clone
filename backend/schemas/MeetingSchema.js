import { Schema } from "mongoose";

export const MeetingSchema = new Schema({
  user_id: { type: String },
  meetingCode: { type: String, require: true },
  date: { type: Date, default: Date.now, require: true },
});
