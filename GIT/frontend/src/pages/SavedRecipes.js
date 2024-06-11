import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const navigate = useNavigate()
  const token = localStorage.getItem('jwtToken')
  
  
  useEffect(() => {
   
    
    const fetchSavedRecipes = async () => {
    try {
      if(!token){
        navigate('/auth/login')
        return null
    }
        const response = await axios.get(`http://localhost:4000/auth/users/favorites`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setSavedRecipes(response.data); // Access saved recipes from response
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
    }
    };

      fetchSavedRecipes();
    
  }, []);

 
    

  return (
    <center>
    <div className="saved-recipes-container">
      <h1>Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <p>You haven't saved any recipes yet.</p>
      ) : (
        <div className="recipe-list">
          {savedRecipes.map((recipe) => (
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
      )}
    </div>
    </center>
  );
};

export default SavedRecipes;
