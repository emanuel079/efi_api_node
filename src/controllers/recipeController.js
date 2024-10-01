const db = require('../models');


// Crear una receta
const createRecipe = async (req, res) => {
    try {
        const { name, description, UserId } = req.body;
        const recipe = await db.Recipe.create({ name, description, UserId });
        res.status(201).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creando la receta' });
    }
};

// Obtener todas las recetas
const getRecipes = async (req, res) => {
    try {
        const recipes = await db.Recipe.findAll({
            include: {
                model: db.User,
                attributes: ['id', 'name', 'email']
            }
        });
        res.status(200).json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo las recetas' });
    }
};

// Obtener recetas por UserId
const getRecipesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;  // Obtenemos el UserId desde los parámetros de la URL
        const recipes = await db.Recipe.findAll({

            where: { UserId: userId },  // Filtramos las recetas por el UserId
            include: {
                model: db.User,
                attributes: ['id', 'name', 'email']  // Incluimos la información del usuario
            }
        });

        if (recipes.length === 0) {
            return res.status(404).json({ error: 'No se encontraron recetas para este usuario' });
        }

        res.status(200).json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo las recetas para el usuario' });
    }
};

module.exports = { createRecipe, getRecipes, getRecipesByUserId };
