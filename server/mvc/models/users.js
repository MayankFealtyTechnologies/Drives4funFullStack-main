const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: false, default: null },
    mobile: { type: String, default: null },
    role: { type: String, required: true, enum: ["user", "admin"], default: "user" },
    status: { type: String, required: true, enum: ["pending", "accepted", "rejected"], default: "pending" },
    email: { type: String, default: null },
    password: { type: String, default: null },
    date: { type: Date, default: null },
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
}, { timestamps: true });

const Users = mongoose.model("users", userSchema);
module.exports = Users;