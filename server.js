require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");

const app = express();

console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
console.log("DB:", process.env.DB_NAME);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3307,
});

db.connect((err) => {
  if (err) {
    console.error("Kapcsolódási hiba:", err);
    return;
  }

  console.log("Adatbázis csatlakozva!");
});

// Teszt végpont
app.get("/", (req, res) => {
  res.send("A szerver működik!");
});

// API végpont
app.get("/api/zenekarok", (req, res) => {
  const sql = `
  SELECT
  zenekarok.id AS zenekar_id,
  zenekarok.nev,
  stilusok.stilus_neve,
  zenekarok.orszag,
  zenekarok.varos,
  zenekarok.aktiv_evek,
  zenekarok.tagok,
  zenekarok.legsikeresebb_album,
  zenekarok.kep_url
  FROM zenekarok
  INNER JOIN stilusok
  ON zenekarok.stilus_id = stilusok.id;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        hiba: err.message,
      });
    }

    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Szerver fut a ${PORT} porton`);
});