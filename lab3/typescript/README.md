# To-do CRUD appliation

## Run locally

This application implements small CRUD using [Express.js](https://expressjs.com/) and [PostgreSQL](https://www.postgresql.org/).

To run this app ensure you have [Node.js](https://nodejs.org/) installed on your machine.

Firstly, go to the project directory and install dependencies by running this command: 

```bash
~/project $ npm install 
```

As the dependencies installed, transpile the TypeScript to JavaScript:

```bash
~/project $ npm run build
```

As the code is transpiled you can run the program by running the following command:

```bash
~/project $ npm start
```

Ensure that you have PostgreSQL database running with correct configured `.env` file.

## Run using Docker

Ensure you have [Docker](https://www.docker.com/) installed on your machine.

Run this project in Docker using this command:

```bash
~/project $ docker compose up
```