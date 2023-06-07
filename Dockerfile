FROM node:18-alpine
# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

RUN apk add coreutils
# RUN mkdir /var/run/dev-test
# RUN touch /var/run/dev-test/sock
# RUN chmod 777 /var/run/dev-test/sock


# Install the dependencies
RUN npm install --omit-dev

# Copy the rest of the application code
COPY . .


ENTRYPOINT ["node", "server2.js"]

