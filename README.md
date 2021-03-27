# node-08-products

# HOW TO INSTALL DEPENDENCES

* Clone the repository git clone https://github.com/peamarelle/node-08-products.git

* go to directory cd node-08-products

* Run command npm install

* Create .env file with db url mongodb, enviroment, port and log level (info, silly, error , etc.).

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
* mongoose (mongodb connection)
# Servers

* http://localhost:5000/api/v1 (development).


# Routes

* GET /users (get all users).
* PUT /users/:id (update user).
* DELETE /users/:id (delete user).
* GET /documentation (swagger api documentation).

