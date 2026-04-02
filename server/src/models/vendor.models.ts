import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export type UserRole = "user" | "supervisor" | "admin" | "director";

export interface IVendor extends Document {
  regNo: string;
  email: string;
  phone: string;
  campus: string;
  countryCode: string;
  password: string;
  role: string;
  term: boolean;
  refreshToken?: string;
  isActive: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IVendor>(
  {
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

    role: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// userSchema.pre<IUser>('save', async function () {
//   if (!this.isModified('password')) return

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);

// });

userSchema.pre("save", async function (this: IVendor) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods["comparePassword"] = async function (
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this["password"]);
};

export const User: Model<IVendor> = mongoose.model<IVendor>("User", userSchema);
