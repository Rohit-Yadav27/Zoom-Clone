import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { type } from "node:os";

export const UsersSchema = new Schema({
  name: { type: String, required: [true, "Your name is required"] },
  username: {
    type: String,
    required: [true, "Your useranme is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  token:{type:String}
});

// UsersSchema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 12);
// });
