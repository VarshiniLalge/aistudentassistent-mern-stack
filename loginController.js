import jwt from "jsonwebtoken";
import { Login } from "../models/login.js";

const SECRET = process.env.JWT_SECRET || "studyai_secret";

function createToken(user) {
  return jwt.sign({ userId: user.id }, SECRET, { expiresIn: "7d" });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await Login.authenticate({ email, password });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = createToken(user);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, provider: user.provider } });
}
