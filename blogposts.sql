DROP DATABASE IF EXISTS blogposts;
CREATE DATABASE blogposts;

\c blogposts;

CREATE TABLE posts (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  post VARCHAR,
  
);

INSERT INTO posts (title, post)
	VALUES ('Post', 'This is awesome');