import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    trim: true,
  },
  memberOf: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Board',
    },
  ],
  googleId: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
  },
});

export default mongoose.model('User', UserSchema);
