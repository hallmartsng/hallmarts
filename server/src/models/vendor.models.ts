import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export type UserRole = "user" | "supervisor" | "admin" | "director";

export interface IVendor extends Document {
  regNo: string;
  email: string;
  phone: string;
  campus: string;
  countryCode: string;
  address?: string;
  password: string;
  role: string;
  term: boolean;
  refreshToken?: string;
  isActive: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
  customers?: [mongoose.Schema.Types.ObjectId];
  store_logo?: {
    url: string;
    public_id: string;
  };
  store_name?: string;
  store_description?: string;
  fname?: string;
}

const vendorSchema = new Schema<IVendor>(
  {
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
    address: {
      type: String,

      lowercase: true,
    },

    fname: {
      type: String,
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
    campus: { type: String, required: true },
    countryCode: { type: String, required: true },
    phone: {
      type: String,
      required: true,
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
    store_logo: {
      url: { type: String },
      public_id: { type: String },
    },
    store_name: {
      type: String,
    },
    store_description: {
      type: String,
    },
    customers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false,
      },
    ],
  },
  { timestamps: true },
);

// vendorSchema.pre<IUser>('save', async function () {
//   if (!this.isModified('password')) return

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);

// });

vendorSchema.methods["comparePassword"] = async function (
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this["password"]);
};

export const Vendor: Model<IVendor> = mongoose.model<IVendor>(
  "Vendor",
  vendorSchema,
);
