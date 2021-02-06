COPY authors(author_id, name, photo)
FROM '/Users/josephhuntington/Documents/School/hackReactor/SDC/Reviews/db/csv/authors.csv'
DELIMITER ','
CSV HEADER;

COPY reviews(review_id, author_id, rating, purchased, body, photo, prod_id, created_at)
FROM '/Users/josephhuntington/Documents/School/hackReactor/SDC/Reviews/db/csv/reviews.csv'
DELIMITER ','
CSV HEADER;
