const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  roleName: { type: String, required: true, unique: true },
  permissions: [{ type: String }], // Example: 'manage_products', 'view_orders'
});

module.exports = mongoose.model('Role', roleSchema);
