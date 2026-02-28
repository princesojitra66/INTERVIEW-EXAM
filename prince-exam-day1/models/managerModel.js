const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    salary: { type: Number, required: true },
    designation: { type: String, required: true },
    status: { type: Boolean, default: true },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Manager', managerSchema);