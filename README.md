Dockerization of Blog Project
Overview
The project consists of:

Frontend: An AngularJS application served using Live Server.
Backend: A Node.js API service.
Database: A PostgreSQL instance.
Directory Structure
go
Copy code
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
1. Dockerizing the Backend
Dockerfile for Backend (Node.js API)

Create a Dockerfile in the Backend directory with the following content:

dockerfile
Copy code
# Use the official Node.js image as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]
Build and Run the Docker container for the backend using Docker Compose:

bash
Copy code
docker-compose build
docker-compose up
2. Dockerizing the Frontend
Dockerfile for Frontend (AngularJS)

Create a Dockerfile in the Frontend directory with the following content:

dockerfile
Copy code
# Use the official Node.js image as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the project files into the container
COPY . .

# Install Live Server globally
RUN npm install -g live-server

# Expose the port Live Server will run on
EXPOSE 5500

# Command to run Live Server
CMD ["live-server", "--port=5500", "--no-browser", "--watch=."] 
Build and Run the Docker container for the frontend using Docker Compose:

bash
Copy code
docker-compose build
docker-compose up
3. Dockerizing the Database
PostgreSQL Service in Docker Compose

Configure the docker-compose.yml file to include the PostgreSQL service:

yaml
Copy code
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
4. Docker Compose Configuration
Docker Compose File

Create or update the docker-compose.yml file in the root directory:

yaml
Copy code
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
5. Issues and Resolutions
Issue 1: Frontend CSS Not Loading Properly

Problem: CSS file was not applied, and the browser showed errors related to MIME types and file paths.
Solution:
Updated the link to the CSS file in index.html to href="./app.css".
Ensured the CSS file path was correct and accessible.
Issue 2: Docker Build Failed for Frontend

Problem: Error related to missing Frontend/ directory during Docker build.
Solution:
Verified the path in the Dockerfile and adjusted COPY Frontend/ /usr/src/app/ to COPY . . for simplicity in the context.
Issue 3: Version Warning in Docker Compose

Problem: Warning about the obsolete version attribute in Docker Compose.
Solution:
Updated the Docker Compose file to remove the version attribute as it's no longer necessary.
6. Final Deployment Steps
Stop any running containers and remove them:

bash
Copy code
docker-compose down
Build the containers without using cache to ensure everything is up-to-date:

bash
Copy code
docker-compose build --no-cache
Start the containers:

bash
Copy code
docker-compose up
Verify that all services are running correctly by visiting:

Frontend: http://127.0.0.1:5500
Backend: http://localhost:3000
Database: Accessible internally by other services.
