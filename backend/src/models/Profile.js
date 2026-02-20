import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    username: { type: String, required: true, unique: true, lowercase: true },
    displayName: { type: String, required: true },
    bio: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    theme: {
      background: { type: String, default: '#0f172a' },
      foreground: { type: String, default: '#f8fafc' },
      accent: { type: String, default: '#22d3ee' },
      buttonStyle: { type: String, enum: ['rounded', 'pill'], default: 'rounded' }
    }
  },
  { timestamps: true }
);

profileSchema.index({ username: 1 });

export const Profile = mongoose.model('Profile', profileSchema);
