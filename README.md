<h1 align="center">
    <img src="./assets/logo.svg" alt="Financeer Logo" width="35%">
</h1>

# Getting Started

## :rocket: Getting started with Docker
1. Install docker: https://docs.docker.com/get-docker/
2. Install docker-compose: https://docs.docker.com/compose/install/
3. Clone this repo: `git clone https://github.com/erickivel/Financeer.git`
4. Move to the directory: `cd Financeer`
5. Run `docker-compose up` to builds, creates, starts and attaches the containers
6. To view the web application, go to: http://localhost:3000
7. The server runs on: http://localhost:3333

To stop and removes the containers, run `docker-compose down` 

Note: If `docker-compose up` or `docker-compose down` doesn't work run respectively `sudo docker-compose up` or `sudo docker-compose down`

## :rocket: Getting started without Docker
1. Clone this repo: `git clone https://github.com/erickivel/Financeer.git`
2. Move to the directory: `cd Financeer`

### Server
1. Move to the server directory: `cd server`
2. Run `yarn` or `npm install` to install the dependencies
3. Run `yarn dev:server` or `npm run dev:server` to start the server
4. The server runs on http://localhost:3333

### Web
1. Move to the web directory: `cd web`
2. Run `yarn` or `npm install` to install the dependencies
3. Run `yarn start` or `npm run start` to start the web application
4. The web application runs on http://localhost:3000

## :memo: License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
