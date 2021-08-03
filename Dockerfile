FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY node_modules ./node_modules
# COPY package*.json ./

# RUN npm -g install yarn

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
# COPY docs ./
# COPY server.js ./

# RUN npm -g install yarn
RUN yarn
RUN yarn build

EXPOSE 80
CMD [ "yarn", "server" ]
