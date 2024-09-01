# Dockerization of Blog Application

This project consists of a Node.js API backend, an AngularJS frontend, and a PostgreSQL database. This guide will walk you through the steps to Dockerize and run the entire application using Docker Compose.

## Prerequisites

- Docker installed on your machine
- Docker Compose installed

## Project Structure

The project is organized as follows:


Blog
│
├── Backend
│   ├── Dockerfile
│   ├── app.js
│   ├── package.json
│   └── other files...
│
├── Frontend
│   ├── Dockerfile
│   ├── app.css
│   ├── app.js
│   ├── index.html
│   └── other files...
│
└── docker-compose.yml



## Docker Setup

### 1. Dockerfiles

#### Backend (`Backend/Dockerfile`)

```Dockerfile
# Use the official Node.js image as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy all files into the container
COPY . /usr/src/app/

# Install dependencies
RUN npm install

# Expose the port the API will run on
EXPOSE 3000

# Command to run the API
CMD ["node", "app.js"]

Frontend (Frontend/Dockerfile)
# Use the official Node.js image as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy all the project files into the container
COPY . /usr/src/app/

# Install Live Server globally
RUN npm install -g live-server

# Expose the port Live Server will run on
EXPOSE 5500

# Command to run Live Server
CMD ["live-server", "--port=5500", "--no-browser", "--watch=."]


2.Docker Compose Configuration
The docker-compose.yml file orchestrates the services:
version: '3.8'

services:
  db:
    image: postgres:latest
    environment:
      POSTGRES_USER: tajbiul_rawol
      POSTGRES_PASSWORD: BlogApp123
      POSTGRES_DB: BlogDB
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

  api:
    build: ./Backend
    ports:
      - "3000:3000"
    environment:
      DB_USER: tajbiul_rawol
      DB_HOST: db
      DB_NAME: BlogDB
      DB_PASSWORD: BlogApp123
      DB_PORT: 5432
      PORT: 3000
    depends_on:
      - db

  frontend:
    build:
      context: ./Frontend
      dockerfile: Dockerfile
    ports:
      - "5500:5500"
    depends_on:
      - api

volumes:
  db_data:

3. Running the Application
To build and run the Docker containers, follow these steps:
docker-compose build

Start the Docker containers:
docker-compose up

You can also run the containers in detached mode:
docker-compose up -d

Access the Application:

Frontend: http://localhost:5500
API: http://localhost:3000/api/posts



Stopping the Containers:

To stop and remove the containers, networks, and volumes, run:
docker-compose down

4. Ignoring Unnecessary Files
To optimize your Docker builds, add the following to your .dockerignore file:

node_modules
npm-debug.log
Dockerfile
.dockerignore
coverage

5. Running Tests (Optional)
If your application includes tests, you can run them within the container or outside, depending on your setup. Make sure to update your Docker configuration if necessary.
