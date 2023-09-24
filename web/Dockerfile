FROM node:alpine
WORKDIR /srv/web
COPY package*.json .
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]
