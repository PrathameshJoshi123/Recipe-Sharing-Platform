// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('jwtToken');
        alert("Logged out successfully")
        console.log('Logged out successfully');
        // Redirect to the login page or any other appropriate page
    };
    
    return (
        <nav className="navbar"> 
            <Link to="/"><img className='logo' src='data:image/png;base64,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'/></Link>
            <ul className="navbar-links">
                <li>
                    <Link to="/recipes">Recipes</Link>
                </li>
                <li>
                    <Link to="/recipes/create">CreateRecipe</Link>
                </li>
                <li>
                    <Link to="/savedrecipes">SavedRecipes</Link>
                </li>
                <li>
                    <Link to="/auth/signup">Signup</Link>
                </li>
                <li>
                    <Link to="/auth/login">Login</Link>
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                    </li>
            </ul>
        </nav>
    );
};

export default Navbar;
