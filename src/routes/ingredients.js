const router = require('express').Router();

const IngredientsModel = require('../models/Ingredients');

const { isAuthenticated } = require('../middlewares/authentication');

router.get('/get/:ingredientId', [isAuthenticated], async (req, res, next) => {
  try {
    const ingredientId = req.params.ingredientId
    const ingredientData = await IngredientsModel.findById({ _id: ingredientId });

    res.status(200).json({ success: true, data: ingredientData });
  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});

module.exports = router;
