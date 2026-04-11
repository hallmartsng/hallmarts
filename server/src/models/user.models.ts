import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export type UserRole = "user" | "student" | "admin";

export interface IUser extends Document {
  name?: string;
  regNo?: string;
  email: string;
  password: string;
  campus: string;
  countryCode: string;
  refreshToken?: string;
  role: UserRole;
  fname?: string;
  isActive: boolean;
  wishList: mongoose.Types.ObjectId[];
  phone?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      // required: true,
      trim: true,
    },
    regNo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    refreshToken: {
      type: String,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    campus: { type: String, required: true },
    countryCode: { type: String, required: true },
    fname: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user"],
      default: "user",
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    wishList: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true },
);

userSchema.methods["comparePassword"] = async function (
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this["password"]);
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
