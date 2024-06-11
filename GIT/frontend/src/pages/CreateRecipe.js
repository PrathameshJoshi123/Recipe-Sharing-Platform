import React, { useState } from 'react';
import axios from 'axios';
import '../css/CreateRecipe.css';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = ({ isAuthenticated }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    try {
      const newRecipe = { title, image, description, ingredients: ingredients.split(','), instructions };
      const token = localStorage.getItem('jwtToken');
      console.log(token)
      if (!token) {
        navigate('/auth/login');
        return;
      }

      const response = await axios.post('http://localhost:4000/recipe/createrecipes', newRecipe, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      	
      if(response){
        alert("recipe created")
      }
      console.log('Recipe created:', response.data);
      
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <div className='bg'>
      <div className="recipe-form-container">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Image URL (it should be jpg or png):</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label>Ingredients (separated by commas):</label>
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label>Instructions:</label>
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required></textarea>
        </div>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
    </div>
    
  );
};

export default CreateRecipe;
