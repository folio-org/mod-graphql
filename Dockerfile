FROM node:10
WORKDIR /usr/src/app
# Copying these separately prevents node_modules
# being reinstalled on other changes
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN ./tests/setup.sh --production
EXPOSE 3001
CMD yarn start tests/input/*/ramls/*.raml
