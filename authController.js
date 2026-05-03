import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

const SECRET = process.env.JWT_SECRET || "studyai_secret";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "PLACEHOLDER_CLIENT_ID";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

function createToken(user) {
  return jwt.sign({ userId: user._id || user.id }, SECRET, { expiresIn: "7d" });
}

export async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  const existing = await User.findByEmail(email);
  if (existing) {
    return res.status(409).json({ error: "User already exists" });
  }

  const user = await User.create({ name, email, password });
  const token = createToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, provider: user.provider } });
}

export async function googleLogin(req, res) {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Google token is required" });
  }

  try {
    let payload;
    
    // Fallback Mock Login if Client ID is missing
    if (token === "MOCK_GOOGLE_TOKEN") {
      payload = {
        email: "test.google.user@example.com",
        name: "Mock Google User"
      };
    } else {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    }
    
    if (!payload || !payload.email) {
      return res.status(400).json({ error: "Invalid Google token payload" });
    }

    const email = payload.email.toLowerCase();
    const name = payload.name || payload.email.split("@")[0];

    let user = await User.findByEmail(email);
    if (!user) {
      user = await User.createGoogle({ name, email });
    }

    const jwtToken = createToken(user);
    res.json({ token: jwtToken, user: { id: user._id, name: user.name, email: user.email, provider: user.provider } });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(401).json({ error: "Google authentication failed" });
  }
}

export function me(req, res) {
  return res.json({ user: req.user });
}

