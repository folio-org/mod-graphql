FROM node:18-alpine AS base
RUN apk add --no-cache git
WORKDIR /usr/src/app

# Create a Docker build stage cache layer with node_modules only
# to skip yarn install when package.json doesn't change
# https://stackoverflow.com/questions/35774714
COPY package.json .
COPY yarn.lock .

FROM base AS production
RUN yarn install --production

FROM base AS release
COPY --from=production /usr/src/app/node_modules/ /usr/src/app/node_modules/
COPY . .
RUN ./build/setup-for-build.sh
EXPOSE 3001
CMD yarn start ./build/schemas-for-build/*/ramls/*.raml
