const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    favoriteRecipes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Recipe"
    }]
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel