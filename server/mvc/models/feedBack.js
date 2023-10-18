const mongoose = require('mongoose');

const feedBackSchema = new mongoose.Schema({
    name: { type: String, default: null },
    mobile: { type: String, default: null },
    feedback: { type: String, default: null },
}, { timestamps: true });

const FeedBack = mongoose.model("feedBacks", feedBackSchema);
module.exports = FeedBack;