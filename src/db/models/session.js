import mongoose, { Schema } from 'mongoose';
const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'users',
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

const Session = mongoose.model('Session', sessionSchema);

export default Session;
