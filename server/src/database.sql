CREATE TABLE active (
  id SERIAL NOT NULL PRIMARY KEY,
  title varchar(50) unique,
  slug varchar(50) unique,
  content text,
  parseddates text[],
  category varchar(50),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE archive (
  id SERIAL NOT NULL PRIMARY KEY,
  title varchar(50) unique,
  slug varchar(50) unique,
  content text,
  parsedDates text[],
  category varchar(50),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
