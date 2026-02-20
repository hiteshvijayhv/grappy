import mongoose from 'mongoose';

const dailyStatSchema = new mongoose.Schema(
  {
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    linkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Link', required: true },
    date: { type: String, required: true },
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 }
  },
  { timestamps: true }
);

dailyStatSchema.index({ profileId: 1, date: 1 });
dailyStatSchema.index({ linkId: 1, date: 1 }, { unique: true });

export const DailyStat = mongoose.model('DailyStat', dailyStatSchema);
