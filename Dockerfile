# FROM node:latest
# WORKDIR /atol
# COPY package.json ./
# RUN npm install
# COPY . .
# CMD ["npm","start"]


# stage1 as builder
FROM node:alpine3.18 as builder

# copy the package.json to install dependencies
COPY package.json .

# Install the dependencies and make the folder
RUN npm install

WORKDIR /atol

COPY . .

# Build the project and copy the files
RUN npm run build


FROM nginx:1.25-alpine

WORKDIR /usr/share/nginx/html

#!/bin/sh

COPY ./.nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf ./*

# Copy from the stahg 1
COPY --from=builder /atol/build .

#EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
