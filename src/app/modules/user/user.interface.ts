import { Model } from "mongoose";
import { PaginateOptions, PaginateResult } from "../../../types/paginate";

export interface IUser {
  username: string;
  password: string;
  shops: string[]; // array of shop names (min 3)
  profileImage?: string;
}

export interface UserModal extends Model<IUser> {
  paginate: (
    filter: object,
    options: PaginateOptions
  ) => Promise<PaginateResult<IUser>>;
  isExistUserById(id: string): Promise<Partial<IUser> | null>;
  isExistUserByEmail(email: string): Promise<Partial<IUser> | null>;
  isMatchPassword(password: string, hashPassword: string): Promise<boolean>;
}
