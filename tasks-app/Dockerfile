# Import base image
# create working directory
# copy package.json
# install dependencies
# copy project files
# give the execution command


FROM node:20-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["sh", "-c", "PORT=8080 node ./bin/www"]

