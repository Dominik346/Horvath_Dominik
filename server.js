const express = require('express');
const fs = require("fs/promises");
const app = express();
const port = 8080;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/api/users', (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: 'User created', user: req.body });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});