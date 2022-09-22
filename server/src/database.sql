-- create table activeNotes (
--     id serial primary key,
--     title varchar(255) unique,
--     content varchar(255)
-- );

-- create table notes (
--     id serial primary key,
--     title varchar(255) unique,
--     content varchar(255)
-- );

-- create table parseddates (
--     id serial primary key,
--     value varchar(255) unique,
--     note_id int,
--     foreign key (note_id) references notes(id)
-- );

-- create table active (
--     id serial primary key,
--     title varchar(255) unique,
--     slug varchar(255) unique,
--     content varchar(255),
--     timestamp timestamp
-- ); 

-- create table active (
--     id serial primary key,
--     title varchar(255) unique,
--     timestamp timestamp default current_timestamp
-- ); 

CREATE TABLE active (
  id SERIAL NOT NULL PRIMARY KEY,
  title varchar(50) unique,
  slug varchar(50) unique,
  content text,
  parsedDates varchar [],
  category varchar(50),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
);

CREATE TABLE archive (
  id SERIAL NOT NULL PRIMARY KEY,
  title varchar(50) unique,
  slug varchar(50) unique,
  content text,
  parsedDates varchar [],
  category varchar(50),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
);
