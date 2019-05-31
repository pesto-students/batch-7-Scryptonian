import mongoose from 'mongoose';

const { Schema } = mongoose;

const BoardSchema = new Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
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
      name: {
        type: String,
        trim: true,
      },
      issues: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Issue',
        },
      ],
      sequenceNumber: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model('Board', BoardSchema);
