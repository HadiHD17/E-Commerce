# Use official Node image (LTS version)
FROM node:18

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first (for caching layer)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend project
COPY . .

# Expose Vite dev server port (default: 5173)
EXPOSE 5173

# Start Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
