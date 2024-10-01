const express = require('express');
const { createRecipe, getRecipes, getRecipesByUserId } = require('../controllers/recipeController');
const router = express.Router();

router.post('/recipes', createRecipe);          // Crear una receta
router.get('/recipes', getRecipes);             // Obtener todas las recetas
router.get('/recipes/user/:userId', getRecipesByUserId);  // Obtener recetas por UserId

module.exports = router;
