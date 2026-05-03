import { User } from "./User.js";

export class Login {
  static async authenticate({ email, password }) {
    const user = await User.findByEmail(email);
    if (!user) {
      return null;
    }

    const valid = await User.comparePassword(password, user.password);
    if (!valid) {
      return null;
    }

    return user;
  }
}

