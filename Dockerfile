FROM node:14
WORKDIR /usr/src/app
# Copying these separately prevents node_modules
# being reinstalled on other changes
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN ./tests/setup.sh
EXPOSE 3001
CMD yarn start tests/input/*/ramls/*.raml
