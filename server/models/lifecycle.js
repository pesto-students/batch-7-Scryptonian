import mongoose from 'mongoose';

const { Schema } = mongoose;

const LifecycleSchema = new Schema({
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
});

export default mongoose.model('Lifecycle', LifecycleSchema);
