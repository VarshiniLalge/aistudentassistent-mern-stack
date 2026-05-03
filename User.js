import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: false },
  provider: { type: String, enum: ["Email", "Google"], default: "Email" },
  createdAt: { type: Date, default: Date.now },
});

// Avoid OverwriteModelError in watch mode
export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export class User {
  static async create({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      provider: "Email",
    });
    await newUser.save();
    return newUser;
  }

  static async findByEmail(email) {
    return await UserModel.findOne({ email: email.toLowerCase() });
  }

  static async findById(id) {
    return await UserModel.findById(id);
  }

  static async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  static async createGoogle({ name, email }) {
    const newUser = new UserModel({
      name,
      email,
      password: null,
      provider: "Google",
    });
    await newUser.save();
    return newUser;
  }
}

