import mongoose from 'mongoose';

const { Schema } = mongoose;
const IssueSchema = new Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  modifiedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  tags: [
    {
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
    },
  ],
  dueDate: {
    type: Date,
  },
  assignee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  upvotedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      commentedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      comment: {
        type: String,
        trim: true,
      },
    },
  ],
});

export default mongoose.model('Issue', IssueSchema);
