import mongoose from 'mongoose';

const { Schema } = mongoose;
const IssueSchema = new Schema(
  {
    issue: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Issue', IssueSchema);
