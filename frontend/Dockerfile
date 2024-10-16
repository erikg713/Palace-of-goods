# Use the official Node image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the frontend port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
