FROM node:16-alpine
WORKDIR /usr/src/app

# Create a Docker build stage cache layer with node_modules only
# to skip yarn install when package.json doesn't change
# https://stackoverflow.com/questions/35774714
COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN ./tests/setup.sh
EXPOSE 3001
CMD yarn start tests/input/*/ramls/*.raml
