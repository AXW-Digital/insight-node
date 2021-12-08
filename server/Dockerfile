# get the base node image
FROM node:alpine
ARG MAX_OLD_SPACE_SIZE=2048
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}
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