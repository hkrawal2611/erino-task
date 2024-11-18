# Use the official Node.js image with version 20
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Expose the application port
EXPOSE 5000

# Start the application using the compiled JavaScript files
CMD ["node", "src/index.ts"]
