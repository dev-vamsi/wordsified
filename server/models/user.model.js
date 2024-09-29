const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    words: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model.users || mongoose.model("users", userSchema);
