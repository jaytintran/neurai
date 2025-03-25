import express from "express";
import passport from "passport";
import User from "../models/User.js";

const router = express.Router();

// Protected route - Get user profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Protected route - Update entries count
router.put(
  "/entries",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.entries += 1;
      await user.save();
      res.json({ entries: user.entries });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
