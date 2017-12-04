FROM node:8.8.1

# Create app directory
WORKDIR /opt/app

# Install app dependencies
COPY package.json package-lock.json ./

RUN npm install --registry=http://10.10.10.180:4873/
#RUN npm install

COPY public/ ./public

EXPOSE 8080
CMD [ "npm", "start" ]