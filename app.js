const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.error(`DB Connection Error: ${err.message}`);
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(cors());
app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
