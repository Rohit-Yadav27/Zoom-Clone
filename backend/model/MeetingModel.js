import { model } from "mongoose";

import { MeetingSchema } from "../schemas/MeetingSchema.js";

export const MeetingModel = model("Meeting",MeetingSchema);