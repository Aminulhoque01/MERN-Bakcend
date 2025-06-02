import bcrypt from "bcrypt";
import { User } from "./user.model";

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

export const UserService = {
  singUser,
};
