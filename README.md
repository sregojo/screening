## To run the database: ##
* docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
* docker start -ai mongodb

## To run the service: ##
* git clone https://github.com/sregojo/screening.git
* cd screening
* npm install
* npm run start
