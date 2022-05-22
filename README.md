<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/henriquesgi/node-iniciante?style=flat-square">
  <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/henriquesgi/node-iniciante?style=flat-square">
</p>

**node-iniciante** é um projeto "modelo", minha concepção de como um projeto em Node.js deve ser adequadamente criado e mantido.  

O projeto foi criado de modo que qualquer um consiga entender tudo sem nenhuma explicação, tudo está documentado, é coerente e autoexplicatovo.

O nome é **node-iniciante** pois acredito que esse projeto, que nada mais é do que um CRUD bem organizado e documentado, é o que todo júnior (o que eu era em 08/12/2021 quando iniciei o projeto) deveria saber fazer.  

## O que falta ser feito

- Scripts de testes
- Implementar o Redis como uma camada adicional de segurança para o JWT  

## Como iniciar o projeto

Construa a imagem do projeto:  
```bash
docker build -t node-iniciante-image .
```

Crie uma network:  
```bash
docker network create node-iniciante
```
Essa instrução garante que uma bridge seja criada e os containers comuniquem-se por alias.  

Crie um arquivo que será usado para criar as tebelas no PostgreSQL:  
```bash
touch init.sh
```

Insira o seguinte script no arquivo criado:  
```sh
set -e
psql -v ON_ERROR_STOP=1 --username "postgres" --dbname "nodeiniciante" <<-EOSQL
  CREATE TABLE carro (
   placa       VARCHAR(7) PRIMARY KEY CHECK(LENGTH(placa) = 7),
   alugado     BOOLEAN NOT NULL DEFAULT false,
   ano         SMALLINT NOT NULL CHECK(ano > 0 AND ano <= EXTRACT(YEAR FROM NOW())),
   excluido    BOOLEAN NOT NULL DEFAULT false,
   modelo      VARCHAR(50) NOT NULL,
   passageiros SMALLINT NOT NULL CHECK(passageiros > 0 AND passageiros <= 5)
  );
  
  CREATE TABLE cliente (
    cnh      SMALLINT PRIMARY KEY CHECK(cnh > 0 AND cnh < 1000),
    nome     VARCHAR(50),
    endereco VARCHAR(50)
  );
  
  CREATE TABLE historico (
    id                     SERIAL PRIMARY KEY,
    cnh                    SMALLINT REFERENCES cliente (cnh),
    placa                  VARCHAR(7) REFERENCES carro (placa),
    datadevolucaoefetuada  TIMESTAMPTZ DEFAULT null,
    datadevolucaoprevista  TIMESTAMPTZ NOT NULL,
    datalocacao            TIMESTAMPTZ NOT NULL,
    valoraluguel           NUMERIC(6,2) NOT NULL
  );
  
  CREATE TABLE usuario (
    id     VARCHAR(20) PRIMARY KEY,
    nome   VARCHAR(50) NOT NULL,
    senha  VARCHAR(150) NOT NULL
  );
  
  INSERT INTO usuario (id, nome, senha) VALUES ('joao', 'Joãozinho', '\$2b\$10\$F84zDBa8mGpVV9iavLo2CusS1q4.Dh3yIt87edWccmdCk/3wd79aG');
  INSERT INTO usuario (id, nome, senha) VALUES ('maria', 'Maria', '\$2b\$10\$rhyt5RpdeAeajGtScQg9JOgMFRWAh7zLyQ5TH5ITy24P/Td0Acedm');
EOSQL
```

Crie e inicialize os containers:  
```bash
# PostgreSQL
docker run -d \
--name db-node-iniciante \
--network node-iniciante \
--network-alias	 db-node-iniciante \
-e POSTGRES_DB=nodeiniciante \
-e POSTGRES_PASSWORD=postgres \
-p 5432:5432/tcp \
-v "$(pwd)"/init.sh:/docker-entrypoint-initdb.d/init.sh \
postgres

# App do projeto
docker run -d \
--name app-node-iniciante \
--network node-iniciante \
--network-alias	 app-node-iniciante \
--pull=never \
-p 3000:3000/tcp \
node-iniciante-image
```

## Documentação

Documentação para utilizar as APIs: **_ip:3000/development/api_**  

Para gerar um JWT acesse a API de login com algum dos usuários:  
```text
joao/123
maria/abc
```

Não é necessário nenhuma explicação adicional, o projeto está totalmente documentado e foi escrito seguindo padrões.  

É possível gerar a documentação dele utilizando o **Compodoc**.  
Apesar do Compodoc ser bem útil para Angular e NestJS, eu não gosto dele e por isso não está no projeto.  
