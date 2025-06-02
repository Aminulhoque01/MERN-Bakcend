import { UserModel } from "./user.model";
import { isValidPassword } from "./user.validation";

const singUser = async (
  username: string,
  password: string,
  shops: string[]
) => {
  if (!isValidPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters and contain at least one number and one special character"
    );
  }

  if (shops.length < 3) {
    throw new Error("Please provide at least 3 shop names");
  }

  // Check if shops are unique globally
  const shopConflict = await UserModel.findOne({ shops: { $in: shops } });
  if (shopConflict) {
    throw new Error("One or more shop names are already taken by another user");
  }

  // Check if username is taken
  const userExists = await UserModel.findOne({ username });
  if (userExists) {
    throw new Error("Username already exists");
  }

  // Create and save user
  const user = new UserModel({ username, password, shops });
  await user.save();
  return user;
};

export const UserService = {
  singUser,
};
