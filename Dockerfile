FROM node:14 AS base
WORKDIR /usr/src/app

# Create a Docker build stage cache layer with node_modules only
# to skip yarn install when package.json doesn't change
# https://stackoverflow.com/questions/35774714
COPY package.json .
COPY yarn.lock .

FROM base AS production
RUN yarn install --production

FROM production AS test
RUN yarn install
COPY . .
RUN ./tests/setup.sh

FROM base AS release
COPY --from=production /usr/src/app/node_modules/ /usr/src/app/node_modules/
COPY . .
EXPOSE 3001
CMD yarn start tests/input/*/ramls/*.raml
