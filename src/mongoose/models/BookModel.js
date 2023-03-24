const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isAvailable: { type: Boolean, required: true },
    borrower: { type: String },
    createdAt: { type: Date, default: Date.now, index: true },
    updatedAt: { type: Date, default: Date.now, index: true },
  },
  { versionKey: false, timestamps: true }
);

const Book = mongoose.model('Book', BookSchema);

BookSchema.index({ createdAt: -1 });

module.exports = Book;
