const express = require('express');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1/mestodb ' } = process.env;

const app = express();
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });