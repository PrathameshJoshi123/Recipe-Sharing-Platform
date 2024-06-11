
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    
});



const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
