const express = require('express');
const router = express.Router();

const controller = require('../controllers');

router.get('/meal/:name/:date', controller.getMeals);
router.get('/:name', controller.getSchool);
router.get('/meal/:name', controller.getTodayMeals);
router.get('/meal/:name/:type/date', controller.getMeal)

module.exports = router;
