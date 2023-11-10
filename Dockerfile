FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

# Expose the port from .env
# ENV APP_PORT=${APP_PORT}
EXPOSE 8080

# for development
CMD npm run dev

# for production
# CMD npm run start