# Check out https://hub.docker.com/_/node to select a new base image
FROM node:10-slim

# creation de la racine de l'application`
USER node

# creation des repertoires
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

RUN npm install

# Bundle app source code
COPY --chown=node . .

RUN npm run build

# variable d'environnement
ENV HOST=0.0.0.0 PORT=3000

# exportation du port
EXPOSE ${PORT}
CMD [ "node", "." ]
