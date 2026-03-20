const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Order schema
const orderSchema = new Schema({
  cart2: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  breakfast: {
    type: Number,
    required: true
  }
}, { timestamps: true });
mongoose.models = {}

const Orderoom = mongoose.model('Orderoom', orderSchema);

// Export the models
module.exports = Orderoom;