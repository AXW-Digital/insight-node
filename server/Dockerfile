# get the base node image
FROM node:alpine

# set the working dir for container
WORKDIR /server

# copy the json file first
COPY ./package.json /server
COPY package-lock.json ./

# install npm dependencies
RUN npm install

# copy other project files
COPY . .

WORKDIR /server/client

RUN npm install

WORKDIR /server

EXPOSE 3000

# build the folder
CMD [ "npm", "run", "dev" ]