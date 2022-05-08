FROM node:lts-alpine
ENV JWT_SECRET="node-iniciante-secreto"
ENV JWT_EXPIRES_IN="7d"
ENV POSTGRES_HOST="10.0.0.100"
ENV POSTGRES_PORT="5432"
ENV POSTGRES_DATABASE="nodeiniciante"
ENV POSTGRES_USERNAME="postgres"
ENV POSTGRES_PASSWORD="postgres"
EXPOSE 3000/tcp
WORKDIR /app
COPY package.json, package-lock.json
RUN ["npm", "install", "--production"]
COPY . .
RUN ["npm", "run", "build"]
CMD ["npm", "run", "start:prod"]