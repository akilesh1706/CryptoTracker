# Use the official Node.js image with an Alpine variant for a smaller image size
FROM node:17-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project (src, public, etc.) into the container
COPY . .

# Build the app for production (this creates an optimized build in /build)
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]