// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import RecipeList from './pages/RecipeList';
import CreateRecipe from './pages/CreateRecipe'
import RecipeDetails from './pages/RecipeDetails';
import SavedRecipes from './pages/SavedRecipes';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<RecipeList />} />
                <Route path="/recipes/create" element={<CreateRecipe />} />
                <Route path="/savedrecipes" element={<SavedRecipes />} />
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
