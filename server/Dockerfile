# get the base node image
FROM node:alpine

# set the working dir for container
WORKDIR /frontend

# copy the json file first
COPY ./package.json /frontend
COPY package-lock.json ./

# install npm dependencies
RUN npm install

# copy other project files
COPY . .

EXPOSE 3000

# build the folder
CMD [ "npm", "start" ]