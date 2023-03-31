const express = require('express');
const mongoose = require('mongoose');
const routes=require('./routes/routes');
const app = express();
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI ='mongodb+srv://aminehz:amine123@gestionfacture.gpoz8lu.mongodb.net/gestionFacture?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes

app.use(routes);