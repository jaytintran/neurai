import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(passport.initialize());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Passport JWT Strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const User = mongoose.model("User");
      const user = await User.findById(jwt_payload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Clarifai API Config
const CLARIFAI_API_KEY = process.env.CLARIFAI_API_KEY;
const CLARIFAI_API_URL =
  "https://api.clarifai.com/v2/models/face-detection/outputs";

// Shared Clarifai API call function
const callClarifaiApi = async (inputData) => {
  try {
    const payload = {
      inputs: [
        {
          data: {
            image: inputData, // Expects { url: "..." } or { base64: "..." }
          },
        },
      ],
    };

    const response = await fetch(CLARIFAI_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Key ${CLARIFAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Clarifai API request failed with status ${response.status}: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    throw error; // Let the caller handle it
  }
};

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Server error", details: err.message });
    }
    if (!user) {
      return res
        .status(401)
        .json({
          error: "Unauthorized",
          details: info?.message || "Invalid or missing token",
        });
    }
    req.user = user;
    next();
  })(req, res, next);
};
// Proxy for URL-based image detection
app.post("/detect", authMiddleware, async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl)
      return res.status(400).json({ error: "Image URL is required" });

    const data = await callClarifaiApi({ url: imageUrl });
    res.json(data);
  } catch (error) {
    console.error("Error calling Clarifai API:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Proxy for file-based image detection
app.post("/detect-file", authMiddleware, async (req, res) => {
  try {
    const { imageData } = req.body;
    if (!imageData)
      return res.status(400).json({ error: "Image data is required" });

    const base64Image = imageData.startsWith("data:image")
      ? imageData.split(",")[1]
      : imageData;

    const data = await callClarifaiApi({ base64: base64Image });
    res.json(data);
  } catch (error) {
    console.error("Error calling Clarifai API (File):", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
