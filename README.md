# backend
Stack used:
- nodejs
- graphql
- nexus
- prisma
- postgres

Some services are running inside Docker,you need to start those services before running the project
To start
```sh
docker-compose up -build
```
Then start the project
```sh
yarn dev
```
Defaul users and vehicule data need to be seeded
Run ```sh 
yarn seed
```
