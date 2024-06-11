
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema([{
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        ref: 'User',
        
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}]);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
