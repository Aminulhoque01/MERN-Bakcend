import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config";
import { User } from "./user.model";

// Define JWT expiration constants
const JWT_EXPIRES_IN_REMEMBER = "30d";
const JWT_EXPIRES_IN_DEFAULT = "1d";

export async function areShopsUnique(shops: string[]): Promise<boolean> {
  const existing = await User.findOne({ shops: { $in: shops } });
  return !existing;
}

const singUser = async (
  username: string,
  password: string,
  shops: string[]
) => {
  const userExists = await User.findOne({ username });
  if (userExists) throw new Error("Username already taken");

  // Check shops unique globally
  if (!(await areShopsUnique(shops))) {
    throw new Error("One or more shop names are already taken");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = new User({
    username,
    password: hashedPassword,
    shops,
  });

  await user.save();

  return user;
};

const LoginUser = async (
  username: string,
  password: string,
  rememberMe: boolean
) => {
  const user = await User.findOne({ username });

  if (!user) throw new Error("User not found");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) throw new Error("Incorrect password");

  // Generate token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    config.jwt.accessSecret,
    {
      expiresIn: rememberMe ? JWT_EXPIRES_IN_REMEMBER : JWT_EXPIRES_IN_DEFAULT,
    }
  );

  return { user, token };
};

const profile = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new Error("User not found");

  return user;
};

export const UserService = {
  singUser,
  LoginUser,
  profile,
};
