// routes/recipeRoutes.js
const express = require('express');
const Recipe = require('../model/Recipe');
const Comment = require('../model/comments')
const Rating = require('../model/rating')
const authenticateJWT = require('../authenticateJWT');

const router = express.Router();

router.post('/createrecipes', authenticateJWT, async (req, res) => {
  try {
    
    const { title, image, description, ingredients, instructions } = req.body;
    await Recipe.create({
      title,
      image,
      description,
      ingredients,
      instructions,
      createdBy: req.user.username, 
    });

    
   
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ message: 'Error creating recipe', error: err });
  }
});

// Get all recipes
router.get('/getrecipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single recipe
router.get('/getrecipe/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (recipe === null) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/recipes/:recipeId/comments', authenticateJWT, async (req, res) => {
    try {
        const {text, recipe} = req.body;
        const user = req.user.username;
        const comment = new Comment({
            text : text,
            recipe: recipe,
            user : user,
            
            
        });
        const xyz = await comment.save()
        
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/recipes/:recipeId/getcomments', async (req, res) => {
    const { recipeId } = req.params;
  
    try {
      const comments = await Comment.find({ recipe: recipeId }); // Find comments matching the recipe ID
      res.json(comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });

router.post('/ratings', async (req, res) => {
    try {
        const rating = await Rating.create(req.body);
        res.status(201).json(rating);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
module.exports = router;
