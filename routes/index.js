const express = require('express');
const router = express.Router();

const controller = require('../controllers');

router.get('/:name', controller.getSchool);

module.exports = router;
