import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    commentedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Comment', CommentSchema);
