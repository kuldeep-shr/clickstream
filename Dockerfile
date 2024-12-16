# Use a base image with necessary build tools for native dependencies
FROM node:18-alpine

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

# Run the build command and then start the app
CMD ["sh", "-c", "npm start"]