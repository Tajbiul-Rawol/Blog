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
