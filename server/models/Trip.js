const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number, required: true },
    description: { type: String, required: false },
    itinerary: { type: [String], required: false },
    expenses: { type: [Number], required: false },
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);