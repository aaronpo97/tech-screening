CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE books (
     id uuid DEFAULT uuid_generate_v4(),
     created_at TIMESTAMP DEFAULT NOW(),
     title VARCHAR(120) NOT NULL,
     author VARCHAR(120) NOT NULL,
     isbn VARCHAR(50) NOT NULL,
     synopsis VARCHAR(250),
     publication_year SMALLINT NOT NULL,
     PRIMARY KEY (id)
);