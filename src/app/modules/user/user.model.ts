
import bcrypt from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.interface";

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
  },
  shops: {
    type: [String],
    required: true,
    validate: {
      validator: (shops: string[]) => shops.length >= 3,
      message: "At least 3 shops are required",
    },
  },
});

// Pre-save hook to hash password
userSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<IUserDocument>("User", userSchema);
