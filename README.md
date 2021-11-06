# Login and Registration Boilerplate
This is a boilerplate project to use as a jumping off point for future projects in order to get started quicker.

### Getting Started.
```bash
	git clone https://github.com/scurran080/login-registration-boilerplate
```

##### Requirements
- pg (Postgres library)
- cors
- jsonwebtoken
- bcrypt
- express
- nodemon (optional but recommended)

Install all dependencies.

```bash
 npm install express pg jsonwebtoken bcrypt cors nodemon
```

You will need to create a db.js file with the configuration for the postgres database.
```js 
const Pool = require("pg").Pool
const pool = new Pool({
	user:"databaseUser",
	password:"databasePassword",
	host:"locathost",
	port:5432,
	database:"databaseName"
});

module.exports = pool;
```
I am using postgres in this instance, so the default user would be "postgres" and the default port is 5432.

If you also use postgres I recommend trying out [pgAdmin](https://www.pgadmin.org/ "PostgreSQL Tool").
