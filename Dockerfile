# --- STAGE 1: Build the React Application ---
# Use an official Node image to build the assets
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the application
COPY . .
# Running the build command (adjust if using Vite or Yarn)
RUN npm run build


# --- STAGE 2: Serve the Static Assets using Nginx ---
# Use a very lightweight Nginx image
FROM nginx:alpine

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React application (static files) from the 'builder' stage 
# to the Nginx default static file directory.
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port Nginx will listen on
EXPOSE 80

# The default command runs Nginx
CMD ["nginx", "-g", "daemon off;"]
