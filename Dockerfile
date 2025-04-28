# Use Node.js LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Expose port 5173 for Vite dev server
EXPOSE 5173

# Command to run the app
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
