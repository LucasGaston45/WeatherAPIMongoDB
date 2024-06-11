const express = require('express');
const router = express.Router();
const historialBusqueda = require('../models/HistorialBusqueda.js');

router.get('/', async (req, res) => {
  try {
    const history = await historialBusqueda.find();
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const search = new historialBusqueda({
    location: req.body.location
  });
  try {
    const newSearch = await search.save();
    res.status(201).json(newSearch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;