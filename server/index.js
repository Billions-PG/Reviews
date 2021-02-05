const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg');
const icons = require('../src/assets/icons.js');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'billionspg',
});

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.resolve(__dirname, '../public')));

const randIcon = () => icons[Math.floor(Math.random() * icons.length)];

app.get('/api/reviews/:id', async (req, res) => {
  const response = [];

  const reviews = await pool.query('SELECT * FROM reviews WHERE prod_id = $1', [req.params.id]);

  await Promise.all(reviews.rows.map(async (review) => {
    const author = await pool.query('SELECT * FROM authors WHERE author_id = $1', [review.author_id]);
    response.push({
      author: {
        photo: author.rows[0].photo,
        name: author.rows[0].name,
      },
      _id: review.review_id,
      rating: review.rating,
      purchased: review.purchased,
      body: review.body,
      photo: review.photo,
      prodId: review.prod_id,
      createdAt: review.created_at,
    });
  }));

  res.send(response);
});

app.post('/api/reviews', async (req, res) => {
  const author = await pool.query('INSERT INTO authors(name, photo) VALUES ($1, $2) RETURNING author_id', [req.body.author.name, randIcon()]);
  const query = 'INSERT INTO reviews(author_id, rating, purchased, body, photo, prod_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)';
  const params = [author.rows[0].author_id, Math.floor(req.body.rating), req.body.purchased, req.body.body, '', req.body.prodId, Date.now()];
  pool.query(query, params);

  res.status(201).send();
});

module.exports = app;
