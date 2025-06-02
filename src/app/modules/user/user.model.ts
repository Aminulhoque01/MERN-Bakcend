import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.interface";

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema<IUserDocument> = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  shops: {
    type: [String],
    required: true,
    validate: {
      validator: (shops: string[]) => shops.length >= 3,
      message: "Must have at least 3 shops",
    },
  },
});

export const User = mongoose.model<IUserDocument>("User", userSchema);
