const express = require('express');
const Trip = require('../models/Trip');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get all trips for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single trip
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create trip
router.post('/', authMiddleware, async (req, res) => {
  const trip = new Trip({
    userId: req.user.id,
    ...req.body
  });

  try {
    const newTrip = await trip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update trip
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    
    Object.assign(trip, req.body);
    const updatedTrip = await trip.save();
    res.json(updatedTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete trip
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;