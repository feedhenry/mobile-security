FROM node:6

EXPOSE 8080

# Create app directory
RUN mkdir -p $HOME/src/app
WORKDIR $HOME/src/app

# Install app dependencies
COPY package.json $HOME/src/app/
RUN npm install

# Bundle app source
COPY . $HOME/src/app

CMD ["npm", "start"]

