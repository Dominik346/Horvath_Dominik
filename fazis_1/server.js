const express = require('express');
const fs = require("fs/promises");
const mysql = require('mysql2/promise');

const app = express();
const port = 8080;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3307,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '',
  database: process.env.DB_NAME || 'iskola_db'
};


app.get('/', (req, res) =>{
  res.json({
    uzenet: 'Kezdő Iskolai REST API fut',
    elerheto_vegpontok: [
      'GET /api/osztaly',
      'GET /api/osztaly/:id',
      'GET /api/osztaly/:id/diak',
      'GET /api/diak',
      'GET /api/diak:id',
      'GET /api/diak?aktiv=1'
    ]
  })
})

app.get('/api/osztalyok', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM osztalyok');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      hiba: 'Adatbázis hiba'
    });
  }
});

app.post('/api/users', (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: 'User created', user: req.body });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});