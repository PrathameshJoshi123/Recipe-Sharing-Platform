
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema([{
    text: {
        type: String,
        required: true
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        
    },
    user: {
        type: String,
        ref: 'User',
        
    },
    
    
}]);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
