# Medup

medup is a website developed with NodeJS, Express, ReactJS and Vite with the scope of managing medical appointments on doctor and patient sides

## Requirements
1. Be sure of having the following tools installed:
  - Node v18
  - PostgreSQL v15
  - PgAdmin

2. Be sure of having a Postgres user define as follows
  - username: postgres
  - password: root

3. (Optional) if, for some reasons, you have a different root user from the one defined above, you can create it running the following command in a psql terminal:

`CREATE USER postgres WITH PASSWORD 'root'`

`GRANT medup TO postgres`

4. Create a new database named `medup` using pgAdmin or running the following command inside a psql terminal:

   `CREATE DATABASE medup;`
   
   `USE medup;`

## Installation
1. Open a terminal in the root folder of the project and run `npm install`
2. Once the installation is completed, run the server with `node index`
3. Open a new terminal and go to the `/app` sub-directory of the project and run `npm install`
4. Once the installation is completed, run the webapp with ´npm run dev´
5. Your website should be available at the address [localhost:5173](http://localhost:5173)

