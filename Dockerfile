# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files (if they exist)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Install TypeScript globally (if it's not included in dependencies)
RUN npm install -g typescript

# Build the TypeScript code
RUN npm run build

# Expose the port the app will run on
EXPOSE 8080

# Run the build command and then start the app
CMD ["sh", "-c", "npm run build && npm start"]
