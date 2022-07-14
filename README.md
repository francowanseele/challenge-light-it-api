## To start proyect (Dev environment)

### `npm install` 
### `npm dev` 

or

### `yarn` 
### `yarn dev` 

You must create a database, and put the name in the .ENV file (in this case the name `light_it` was used for the database).

Once you have the database execute the following command. This will create the necessary structures for the application to run.

### `npx knex migrate:latest`


## NOTE

The .env file is recommended to be added to .gitignore, for this case it is left accessible in the repository since it does not contain sensitive data.

However you must configure in this file parameters such as the database you are going to use (Postgres, MSSQL recommended). Also you have to setup the API_MEDIC_TOKEN (token for ApiMedic)

## NOTE ABOUT CHALLENGE 

Instead of having the token in the .ENV file, we should authenticate through our api and thus get the token every time it expires.
