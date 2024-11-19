# Use the official Node.js image as a base to build the Angular app
FROM node:16 AS builder

# Set the working directory
WORKDIR /app

# Copy only the package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Angular app
RUN npm run build -- --output-path=dist

# Use Nginx to serve the built app
FROM nginx:alpine

# Copy the built Angular app to the Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
