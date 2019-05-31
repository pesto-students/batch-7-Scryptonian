import mongoose from 'mongoose';

const { Schema } = mongoose;

const BoardSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        member: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        role: {
          type: String,
          enum: ['SUPERADMIN', 'ADMIN', 'USER', 'INVITED'],
          default: 'USER',
          required: true,
        },
      },
    ],
    lifeCycles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lifecycle',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Board', BoardSchema);
