FROM node:22.13.0

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

RUN npm install -g @angular/cli

# Copy app source
COPY . .

RUN npx ng analytics off

# Expose the default Angular dev server port
EXPOSE 4200

# Start the Angular dev server
CMD ["ng", "serve", "--host", "0.0.0.0"]
