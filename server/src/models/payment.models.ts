import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPayment extends Document {
  project?: mongoose.Types.ObjectId;
  amount: number;
  paymentDate: Date;
  method: 'cash' | 'bank_transfer' | 'cheque';
  reference?: string;
  receivedBy?: mongoose.Types.ObjectId;
  approved?: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
const paymentSchema = new Schema<IPayment>(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentDate: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },
    approved: {
      type: Boolean,
      default: false,
      index: true,
    },
    method: {
      type: String,
      enum: ['cash', 'bank_transfer', 'cheque'],
      required: true,
    },
    reference: {
      type: String,
      trim: true,
    },
    receivedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

paymentSchema.index({ project: 1, paymentDate: -1 });
paymentSchema.index({ paymentDate: -1 });

export const Payment: Model<IPayment> = mongoose.model(
  'Payment',
  paymentSchema
);
