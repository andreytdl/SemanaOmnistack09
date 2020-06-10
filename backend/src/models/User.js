const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    // name: String,
    // age: number,
    // active: Boolean,
});

module.exports = mongoose.model('User', UserSchema);