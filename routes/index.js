const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const controller = require('../controllers');

router.get('/school/meal/:name/:date', controller.getMeal);
router.get('/school/:name', controller.getSchool);
router.get('/school/meal/:name', controller.getTodayMeal);

module.exports = router;
