FROM node:16-alpine
WORKDIR /usr/src/app
COPY . .
RUN yarn install \
 && ./tests/setup.sh \
 && rm -rf node_modules/ \
 && yarn install --production \
 && yarn cache clean
EXPOSE 3001
CMD yarn start tests/input/*/ramls/*.raml
