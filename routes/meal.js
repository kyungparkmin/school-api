const express = require('express');
const router = express.Router();

const controller = require("../controllers/meal");

router.get('/:name/:date', controller.getMeals);
router.get('/:name', controller.getTodayMeals);
router.get('/:name/:type/:date', controller.getMeal);

module.exports = router;