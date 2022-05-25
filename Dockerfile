FROM node:lts-alpine3.15 AS build

ENV HOME=/app \
    NODE_ENV=development

WORKDIR $HOME

COPY tsconfig.build.json tsconfig.json package.json $HOME/
RUN  npm install

COPY ./src $HOME/src

RUN npm run build && \
    npm prune --production

FROM node:lts-alpine3.15 as deploy

ENV JWT_SECRET="node-iniciante-secreto" \
    JWT_EXPIRES_IN="7d" \
    POSTGRES_HOST="db-node-iniciante" \
    POSTGRES_PORT="5432" \
    POSTGRES_DATABASE="nodeiniciante" \
    POSTGRES_USERNAME="postgres" \
    POSTGRES_PASSWORD="postgres"

ENV HOME=/app \
    TZ=UTC-8 \
    HTTP_PORT=80 \
    NODE_ENV=production

WORKDIR $HOME

RUN apk update && apk upgrade && apk add --no-cache tzdata

COPY --from=build ./app/dist $HOME/dist
COPY --from=build ./app/package.json $HOME
COPY --from=build ./app/node_modules $HOME/node_modules

CMD [ "npm", "run", "start:prod" ]
