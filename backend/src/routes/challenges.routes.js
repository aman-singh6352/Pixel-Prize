import "dotenv/config";
import express from "express";
import Challenge from "../models/challenge.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/create-challenge", protectedRoute, async (req, res) => {
  const userId = req.user._id;
  const adminIds = [
    process.env.USER_ID1,
    process.env.USER_ID2,
    process.env.USER_ID3,
  ];
  if (!adminIds.includes(userId.toString())) {
    return res.status(403).json({ message: "Access denied!" });
  }
  const { title, startTimehrs, endTimehrs } = req.body;
  const startDate = new Date();
  startDate.setHours(startDate.getHours() + startTimehrs);
  const endDate = new Date();
  endDate.setHours(endDate.getHours() + startTimehrs + endTimehrs);

  // Store in MongoDB
  const newChallenge = new Challenge({
    title,
    startDate,
    endDate,
  });
  const savedChallenge = await newChallenge.save();
  return res.status(201).json({
    title: savedChallenge.title,
    startTime: savedChallenge.startTime,
    endTime: savedChallenge.endTime,
  });
});

router.post("/register", protectedRoute, async (req, res) => {
  const timenow = Date.now();
  const { challengeId, startTime } = req.body;

  // the challenge should not be started yet
  if (new Date(startTime) < new Date(timenow)) {
    return res
      .status(400)
      .json({ message: "The challenege is started already!" });
  }

  const challenge = await Challenge.findById(challengeId);
  // the challenge should exist
  if (!challenge) {
    return res.status(404).json({ message: "Challenge not found1" });
  }

  const user = req.user;
  // check if user is already registered
  if (user.challengesIDs.includes(challengeId)) {
    return res
      .status(400)
      .json({ message: "User already registered for this challenge!" });
  }

  user.challengesIDs.push(challengeId);
  await user.save();
  return res.status(200).json({ message: "User registered successfully!" });
});
