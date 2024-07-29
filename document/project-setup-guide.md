## Bookstore api project setup guideline

### To use or test the API, follow the steps below.

* Step-1: Make a dist directory in project root.
* Step-2: Used mysql DB and local mysql server for this project. As well as use knex query builder so follow some steps below for configure db in project.
          1. First should create mysql db/schema.
          2. Save schema/db information alongwith db port, host, user, password in .env file.
          3. Now need to configure db with knex & knex configurred file exist in src directory knexfile.ts.
          4. Update connection credentials by your crendetials.
* Step-3: Need to make table migration & build schema. Use migration making command for create migration.
* Step-4: Attached a schema definition zip folder where defined schema build query. Use this schema build query based on table(already mentioned which schema work for which table).
* Step-5: Update migration by migration latest command.
* Step-6: In your terminal where you open project, use "npm run build" this command helps to extract src directory in dist directory.
*Step-7: Finally use "npm start" & run the project.     