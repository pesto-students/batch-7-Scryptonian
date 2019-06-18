import mongoose from 'mongoose';

const { Schema } = mongoose;
const LabelSchema = new Schema(
  {
    color: {
      type: String,
      required: true,
    },
    labelName: {
      type: String,
      required: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Label', LabelSchema);
