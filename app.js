const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const indexRouter = require('./routes');
const mealRouter = require('./routes/meal');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/school', indexRouter);
app.use('/school/meal', mealRouter);

app.listen(3001, () => {
  console.log('실행중');
})
