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
    labels: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Label',
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
    lifecycle: {
      type: Schema.Types.ObjectId,
      ref: 'Lifecycle',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Issue', IssueSchema);
