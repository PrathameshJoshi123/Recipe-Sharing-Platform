import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams for route parameters
import '../css/RecipeDetails.css'
import axios from 'axios';


const RecipeDetails = () => {
  const { recipeId } = useParams(); // Get recipe ID from route parameter
  const [recipe, setRecipe] = useState(null);
  const [comm, setcomm] = useState([])
  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/recipe/getrecipe/${recipeId}`); // Fetch recipe by ID
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]); // Re-run useEffect when recipeId changes

  useEffect(() => {
    const fetchCommentsAndRating = async () => {
      try {
        const commentsResponse = await axios.get(`http://localhost:4000/recipe/recipes/${recipeId}/getcomments`);
        setComments(commentsResponse.data);
        
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchCommentsAndRating();
  }, [recipeId]);

  const [rating, setRating] = useState(1); // Initial rating state
  const [comments, setComments] = useState([]); // Array to store comments

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value)); // Update rating on radio button change
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    const token = localStorage.getItem('jwtToken')
    if(!token){
        navigate('/auth/login')
        return null
    }
     
    
    
  
    const newComment = {
      text: comm,
      
      recipe: recipeId, 
    };
  
    try {
      const response = await axios.post(`http://localhost:4000/recipe/recipes/${recipeId}/comments`, newComment,{      
        headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
      console.log('Comment submitted successfully:', response.data);
      
      e.target.comment.value = ''; // Clear comment textarea after submission
    } catch (error) {
      console.error('Error submitting comment:', error);
 
    }
  };

  const handleSaveRecipe = async () => {
    const token = localStorage.getItem('jwtToken')
    if(!token){
        navigate('/auth/login')
        return null
    }
    console.log(token)
    
    
    try {
      console.log(recipeId)
      const response = await axios.put(
        `http://localhost:4000/auth/user/favorites/${recipeId}`, {},{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      console.log('Recipe saved successfully:', response.data);
      
    } catch (error) {
      console.error('Error saving recipe:', error);
      
    }
  };

  
  if (!recipe) {
    return <div>Loading recipe details...</div>;
  }

  return (
    <centre>
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.description}</p>
      <p><b>Created by:</b> {recipe.createdBy}</p>

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>

      <h2>Rating</h2>
      <form>
        <fieldset className="rating">
          <legend>Rate this recipe:</legend>
          <input
            type="radio"
            id="star5"
            name="rating"
            value="5"
            checked={rating === 5}
            onChange={handleRatingChange}
          />
          <label htmlFor="star5">5 stars</label>
          <input
            type="radio"
            id="star4"
            name="rating"
            value="4"
            checked={rating === 4}
            onChange={handleRatingChange}
          />
          <label htmlFor="star4">4 stars</label>
          <input
            type="radio"
            id="star3"
            name="rating"
            value="3"
            checked={rating === 3}
            onChange={handleRatingChange}
          />
          <label htmlFor="star3">3 stars</label>
          <input
            type="radio"
            id="star2"
            name="rating"
            value="2"
            checked={rating === 2}
            onChange={handleRatingChange}
          />
          <label htmlFor="star2">2 stars</label>
          <input
            type="radio"  
            id="star1"
            name="rating"
            value="1"
            checked={rating === 1}
            onChange={handleRatingChange}
          />
          <label htmlFor="star1">1 star</label>
        </fieldset>
      </form>

      <h2>Comment</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p><b>{comment.user}: {comment.text}</b></p>
          </li>
        ))}
      </ul>

      <form >
        <label htmlFor="comment">Leave a comment:</label>
        <textarea id="comment" rows="5" onChange={(e)=> {setcomm(e.target.value)}}></textarea>
        <button onClick={handleSubmitComment} type="submit">Submit Comment</button>
      </form>
        
      <button onClick={handleSaveRecipe}>Save Recipe</button> 
    </div>
    </centre>
  );
};

export default RecipeDetails;
