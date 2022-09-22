create table activeNotes (
    id serial primary key,
    title varchar(255) unique,
    content varchar(255)
);
