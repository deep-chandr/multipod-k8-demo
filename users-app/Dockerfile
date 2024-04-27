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

CMD ["sh", "-c", "PORT=8085 node ./bin/www"]


# Push to remote
# docker tag  <my_image>:<version> <remote_repository>/<my_image>:<version>
# docker push <remote_repository>/<my_image>:<version>

