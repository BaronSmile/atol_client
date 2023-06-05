FROM node:latest
WORKDIR /atol
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm","start"]