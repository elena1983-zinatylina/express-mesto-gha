const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { STATUS_CODES } = require('./utils/constants');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1/mestodb' } = process.env;

const app = express();

mongoose.connect(MONGO_URL)
  .then(() => console.log('База данных подключена'))
  .catch((err) => console.log('Ошибка подключения к БД', err));

mongoose.set({ runValidators: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6475c042db824e6c99dc994f',
  };
  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);

app.all('/*', (req, res) => {
  res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Страница не существует' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});