import { UsersModel } from "../model/UsersModel.js";
import {MeetingModel} from "../model/MeetingModel.js"
import bcrypt from "bcryptjs";
import { createSecretToken } from "../util/SecretToken.js";
import httpStatus from "http-status";
import crypto from "node:crypto";

export const Signup = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    const existingUser = await UsersModel.findOne({ username });

    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    let newUsers = new UsersModel({
      name,
      username,
      password: hashedPassword,
    });

    await newUsers.save();

    res.status(httpStatus.OK).json({
      message: "Registered successfully",
      success: true,
      newUsers,
    });
  } catch (error) {
    console.error(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ message: "All field required" });
    }

    const user = await UsersModel.findOne({ username });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }

    let tokenn = crypto.randomBytes(20).toString("hex");

    user.token = tokenn;
    await user.save();

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(httpStatus.OK).json({
      token: token,
      loginToken: tokenn,
      message: "Login successful",
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export const Logout = async (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getUserHistory = async(req,res) =>  {
  const { token } = req.query;

    try {
        const user = await UsersModel.findOne({ token: token });
        const meetings = await MeetingModel.find({ user_id: user.username })
        res.json(meetings)
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

export const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await UsersModel.findOne({ token: token });
        
        const newMeeting = new MeetingModel({
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}


