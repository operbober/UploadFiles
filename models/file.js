const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    name :String,
    path :String,
    type :String,
    size :Number,
    uploadDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('File', fileSchema);