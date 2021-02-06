SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'billionspg'
  AND pid <> pg_backend_pid();

DROP DATABASE IF EXISTS billionspg;
CREATE DATABASE billionspg;
\c billionspg;

CREATE TABLE authors (
  author_id BIGSERIAL NOT NULL,
  name varchar(50),
  photo varchar(100),
  PRIMARY KEY (author_id)
);

CREATE TABLE reviews (
  review_id BIGSERIAL NOT NULL,
  author_id bigint NOT NULL,
  rating int NOT NULL,
  purchased boolean NOT NULL,
  body varchar(800) NOT NULL,
  photo varchar(100) NOT NULL,
  prod_id varchar(10) NOT NULL,
  created_at bigint NOT NULL,
  PRIMARY KEY (review_id),
  CONSTRAINT fk_author
    FOREIGN KEY (author_id)
      REFERENCES authors(author_id)

);
