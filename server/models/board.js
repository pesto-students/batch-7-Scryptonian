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
        membername: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          enum: ['SUPERADMIN', 'ADMIN', 'USER'],
          default: 'USER',
          required: true,
        },
      },
    ],
    labels: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Label',
      },
    ],
    lifecycles: [
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
