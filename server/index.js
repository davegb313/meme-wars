const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const ORM = require('sequelize');
const connection = new ORM('postgres://memewars:memewars@localhost:5432/memewars');

const modelsFactory = require('./models');
const { User, Meme, Vote } = modelsFactory(connection, ORM);

const api = require('./api')(app, { User, Meme, Vote});

connection.authenticate()
  .then(()=>console.log('success'))
  .catch((err)=> console.log(err));

app.use( express.static('build') );
app.use( express.json() );

app.get('/hydrate', (req, res)=> {
  User.sync({ force: true })
  .then(()=> Meme.sync({ force: true }))
  .then(()=> Vote.sync({ force: true }))
  .then(()=> res.json({ message: 'success creating User, Meme, Vote tables'} ));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
