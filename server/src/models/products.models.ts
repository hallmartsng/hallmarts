import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  vendor: mongoose.Types.ObjectId;
  // campus: mongoose.Types.ObjectId;
  campus: string;
  title: string;
  description: string;
  metaData?: string;
  price: number;
  discount?: number;
  productType?: string;
  //   categories: mongoose.Types.ObjectId[];
  categories: string[];
  images?: { url: string; public_id: string; coverImage: boolean }[];
  isVerified?: boolean;
  stock?: number;
  clicks?: number;
  visible?: boolean;
  status: "approved" | "pending" | "rejected";
  colors?: string[];
  sizes?: string[];
  deliveryFee?: number;
  deliveryDuration?: string;
  isBid?: boolean;
  isSwap?: boolean;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  costPrice?: number; // what the vendor pays
  sellingPrice?: number;
}

const productSchema = new Schema<IProduct>(
  {
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    // campus: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Campus",
    //   index: true,
    // },
    campus: { type: String, trim: true, index: true, required: true },
    title: { type: String, trim: true, index: true },
    description: { type: String, trim: true },
    metaData: { type: String, trim: true },

    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },

    productType: {
      type: String,
      // required: true,
      index: true, // 🔥 filter by type
    },

    // categories: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Category",
    //     index: true, // 🔥 category queries
    //   },
    // ],

    categories: [
      {
        type: String,
        required: true,
        index: true,
      },
    ],
    images: [
      {
        url: { type: String },
        public_id: { type: String },
        coverImage: { type: Boolean, default: false },
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
      index: true, // 🔥 public listings
    },
    visible: {
      type: Boolean,
      default: false,
      index: true, // 🔥 public listings
    },

    stock: {
      type: Number,
      default: 0,
      index: true, // 🔥 stock filtering
    },
    rating: {
      type: Number,
      default: 0,
      index: true, // 🔥 stock filtering
    },
    clicks: {
      type: Number,
      default: 0,
      index: true, // 🔥 clicks filtering
    },

    colors: [String],
    sizes: [String],

    deliveryFee: {
      type: Number,
      // required: true,
    },

    deliveryDuration: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "pending",
    },

    isBid: { type: Boolean, default: false, index: true },
    isSwap: { type: Boolean, default: false, index: true },
    costPrice: { type: Number }, // vendor's cost
    sellingPrice: { type: Number },
  },
  { timestamps: true },
);

// Optimized common storefront queries
productSchema.index({ isVerified: 1, productType: 1 });
productSchema.index({ categories: 1, isVerified: 1 });
productSchema.index({ title: "text", description: "text", metaData: "text" });
productSchema.index({ status: 1, createdAt: -1 });
productSchema.index({ vendor: 1, createdAt: -1 });
productSchema.index({ status: 1, visible: 1 });
productSchema.index({ status: 1, clicks: -1 });

productSchema.pre<IProduct>("save", function (next) {
  if (this.price != null) {
    this.sellingPrice =
      this.discount && this.discount > 0
        ? this.price - (this.price * this.discount) / 100
        : this.price;
  }
  next();
});
export const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema,
);

export default Product;
