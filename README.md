# node-06-restserver

# HOW TO INSTALL DEPENDENCES

* Clone the repository git clone https://github.com/peamarelle/node-06-restserver.git

* go to directory cd node-06-restserver

* Run command npm install

# Scripts

* Run npm run dev to nodemon mode.

* npm start to deploy aplication in production env.

* Run node index to traditional mode.

# PACKAGES

* express (create server and API-REST´s endpoints).
* nodemon (aplication refresh whenever we modify code).
* morgan (request and response informartion).
* dotenv (enviroment variables).
* winston (logger to app´s operations ).
* swagger-ui-express (For api documentation).

# Servers

* https://node-06-apirest.herokuapp.com/api/v1 (production).
* http://localhost:3000/api/v1 (development).


# Routes

* GET /users (get all users).
* POST /users (update users).
* PUT /users/:id (update user).
* DELETE /users/:id (delete user).
* GET /documentation (api documentation).

