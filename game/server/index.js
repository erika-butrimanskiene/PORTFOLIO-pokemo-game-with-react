const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Cors options
const corsOptions = { exposedHeaders: ['game-token'] };

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', routes);
app.use('/uploads', express.static('uploads'));

const DB_URI =
  'mongodb+srv://erikaB:erikaB@cluster0.fp6i4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//Database
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => {
    console.log(`Server is running on port: ${PORT}`);
    app.listen(PORT);
  });
