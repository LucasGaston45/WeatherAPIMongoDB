const mongoose = require('mongoose');

const HistorialBusquedaSchema = new mongoose.Schema({
  location: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('historialBusqueda', HistorialBusquedaSchema);