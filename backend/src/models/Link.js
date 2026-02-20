import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema(
  {
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    position: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    thumbnailUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

linkSchema.index({ profileId: 1, position: 1 });

export const Link = mongoose.model('Link', linkSchema);
