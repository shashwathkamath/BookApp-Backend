import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  price: { type: Number, required: true },
  popularity: { type: Number, default: 0 }
}, { timestamps: true });

bookSchema.index({ location: '2dsphere' });

const Book = mongoose.model('Book', bookSchema);

export default Book; 