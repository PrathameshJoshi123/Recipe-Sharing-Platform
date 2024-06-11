import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/RecipeList.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  
  useEffect(() => {
   
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/recipe/getrecipes');
        setRecipes(response.data); 
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); 
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm) // Case-insensitive search on recipe title
  );

  

  return (
    <center>
    <div>
      <h1>Recipe List</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <Link key={recipe._id} to={`/recipes/${recipe._id}`}> 
            <div className="recipe-card">
              <h2>{recipe.title}</h2>
              <img src={recipe.image} alt={recipe.title} />
              <p>{recipe.description}</p>
              <p>Created by: {recipe.createdBy}</p>
              
            </div>
          </Link>
        ))}
      </div>
    </div>
    </center>
  );
};

export default RecipeList;
