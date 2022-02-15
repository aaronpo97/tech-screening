# Technical Screening: Books App

## Configuration


### Connecting Postgres to Express/Node
Prior to using this application, create a `.env` file in `./books-backend` with the following contents. Parameters for user, password, host, and port are just an example, fill in what is applicable for you.

```env
DB_USER=aaronpo97
DB_DATABASE=books
DB_PASSWORD=password
DB_PORT=5432
DB_HOST=localhost
```

### Seed Database
Now run `node ./books-backend/seed.js` to seed your database.
