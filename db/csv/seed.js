/* eslint-disable camelcase */
const faker = require('faker');
const fs = require('fs');
const icons = require('../../src/assets/icons.js');

const authors = fs.createWriteStream('authors.csv');
authors.write('author_id,name,photo\n', 'utf8');
const reviews = fs.createWriteStream('reviews.csv');
reviews.write('review_id,author_id,rating,purchased,body,photo,prod_id,created_at\n', 'utf8');

const reviewCount = 10000000;
const authorCount = reviewCount / 10;

const maybePhoto = () => {
  const yes = Math.floor(Math.random() * 3) > 1;
  if (yes) return faker.image.image();
  return ' ';
};

function writeAuthors(writer, encoding, callback) {
  let i = authorCount;
  let author_id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      author_id += 1;
      const name = faker.internet.userName();
      const photo = icons[Math.floor(Math.random() * icons.length)];
      const data = `${author_id},${name},${photo}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

function writeReviews(writer, encoding, callback) {
  let i = reviewCount;
  let review_id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      review_id += 1;
      const author_id = (Math.floor(Math.random() * (authorCount)) + 1).toString();
      const rating = Math.floor(Math.random() * 6);
      const purchased = !Math.floor(Math.random() * 2);
      const body = faker.lorem.paragraph();
      const photo = maybePhoto();
      const prod_id = Math.floor(Math.random() * reviewCount);
      const created_at = Date.now();
      const data = `${review_id},${author_id},${rating},${purchased},${body},${photo},${prod_id},${created_at}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

writeAuthors(authors, 'utf-8', () => {
  authors.end();
});

writeReviews(reviews, 'utf-8', () => {
  reviews.end();
});
