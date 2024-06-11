const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../model/User');
const authenticateJWT = require('../authenticateJWT');
const Recipe = require('../model/Recipe');

const router = express.Router()

router.post('/signup', async(req, res)=>{
    try{
        const {username, password} = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        const register = await UserModel.create({username: username, password: hashedPassword})
        if(register){
            return res.json({message:"User created"})
        }
    } catch(err){
        res.json(err)
    }
})

router.post('/login', async(req, res)=>{
    try{
        const {username, password} = req.body;
       
        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = await UserModel.findOne({username: username})
       
        if(!bcrypt.compare(password, user.password)){
            return res.json({message: "logged in unsuccessful"})
        }

        const token = jwt.sign({ userId: user._id }, 'secret');
        console.log(token)
        return res.json({token})
    } catch(err){
        res.json({message:"not logged in", err})
    }
})



router.put('/user/favorites/:recipeId', authenticateJWT, async (req, res) => {
    try {
      
      const userId = req.user._id;
      const recipeId = req.params.recipeId;
      console.log(recipeId)
  
      const user = await UserModel.findByIdAndUpdate(
        userId,
        { $push: { favoriteRecipes: recipeId } }, 
        { new: true } 
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'Recipe saved successfully' });
    } catch (err) {
      console.error('Error saving recipe:', err);
      res.status(500).json({ message: 'Error saving recipe' });
    }
  });
  


  router.get('/users/favorites', authenticateJWT, async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id).populate('favoriteRecipes'); // Populate the user's favoriteRecipes with full recipe details
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const savedRecipes = user.favoriteRecipes;
      res.json(savedRecipes);
    } catch (err) {
      console.error('Error fetching saved recipes:', err);
      res.status(500).json({ message: 'Error fetching saved recipes' });
    }
  });
  
module.exports = router