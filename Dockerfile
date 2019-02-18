FROM node:11

MAINTAINER Ilkka Oksanen <ilkka@iao.fi>

COPY ["package.json", "yarn.lock", "babel.config.js", "webpack.config.js", "/app/"]
COPY server /app/server/
COPY client /app/client/
COPY data /app/data/

WORKDIR /app/server/

RUN yarn install \
  && yarn run build \
  && yarn cache clean

EXPOSE 38000

WORKDIR /app/server/

CMD [ "yarn", "server" ]
