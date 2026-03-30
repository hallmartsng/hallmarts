import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  user: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId[];
  name: string;
  client: string;
  email: string;
  phoneNum: string;
  description: string;
  serviceType:
    | 'architech'
    | 'smart_home_automation'
    | '3d_visualization'
    | 'interior_design';
  budget: number;

  phase: 'planning' | 'design' | 'inspection' | 'execution' | 'closure';
  status: number;

  startDate: Date;
  endDate: Date;

  paymentStatus: 'pending' | 'partial' | 'paid';

  location: {
    state: string;
    address: string;
  };
  stages: [
    {
      name: String;
      completed: { type: Boolean; default: false };
    },
  ];

  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    client: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    serviceType: { type: String, required: true, trim: true },
    phoneNum: { type: String, required: true, trim: true },
    startDate: { type: Date },

    endDate: { type: Date },
    phase: {
      type: String,
      enum: ['planning', 'design', 'execution', 'inspection', 'closure'],
      default: 'planning',
    },
    status: {
      type: Number,
      default: 5,
    },
    budget: { type: Number },
    paymentStatus: {
      type: String,
      enum: ['pending', 'partial', 'paid'],
      default: 'pending',
    },
    stages: [
      {
        name: { type: String, required: true, trim: true },
        completed: { type: Boolean, required: true },
      },
    ],
    // paymentReference: { type: String, trim: true },
    // cancelReason: { type: String, trim: true },
    // rescheduledFrom: { type: Schema.Types.ObjectId, ref: 'Project' },
    // images: [
    //   {
    //     url: { type: String },
    //     public_id: { type: String },
    //     isSelected: { type: Boolean, default: false },
    //   },
    // ],
    location: {
      state: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
    },
  },
  { timestamps: true }
);

projectSchema.index({ user: 1 });
projectSchema.index({ phase: 1 });

projectSchema.index({ email: 1 });
projectSchema.index({ client: 1 });
projectSchema.index({ name: 1 });
projectSchema.index({ createdAt: -1 });
projectSchema.index({ status: 1, phase: 1 });

export const Project: Model<IProject> = mongoose.model(
  'Project',
  projectSchema
);
export default Project;
