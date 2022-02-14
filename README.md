# Technical Screening: Books App

## Configuration

### Seed Database

Prior to using this application, please run `node ./books-backend/seed.js`

### Connecting Postgres to Express/Node

After seeding your database, create a `.env` file in `./books-backend` with the following contents. Parameters for user, password, host, and port are just an example, fill in what is applicable for you.

```env
DB_USER=aaronpo97
DB_DATABASE=books
DB_PASSWORD=password
DB_PORT=5432
DB_HOST=localhost
```