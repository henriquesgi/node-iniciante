# Node Iniciante
<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/henriquesgi/node-iniciante?style=flat-square">
</p>

## Propósito
Uma das coisas mais aconchegantes é abrir um código pela primeira vez e descobrir que ele foi desenvolvido de maneira clara, coerente e que ele é de fácil manutenção. Mas acredite, é algo raro de encontrar.  

Sabe por que o projeto se chama **Node Iniciante**?  
É comum ver pessoas que se julgam fodões, os Jedi da programação, mas que pouco se importarem com documentação, manutenção, testes, qualidade, padrões e outros. Isso me deixa bem incomodado, afinal:  
Difícil manutenção?  
Aumento de custos.  

Foi de XGH?  
Cruze os dedos e reze para seu projeto funcionar até  que ele seja reescrito corretamente.  

Códigos malucos e ilegíveis?  
Provavelmente ninguém vai conseguir corrigir ou modificar nada, é aquilo ali pra sempre e fim.  

Sem documentação?  
Um desenvolvedor inexperiente não vai tentar entender, ele vai direto pedir ajuda a um mais experiente.  

Já viu aquela galera que tem mania de encapsular frameworks?  
Por exemplo, criam algo que encapsula o Express, sem documentação, sem testes e o pior, não dão manutenção :clown_face:.  

E isso é só o começo, existem fatores como desmotivação, fadiga, sensação de que nada melhora e etc., eles estão sempre rondando projetos mal escritos.  

Optei por criar um projeto modelo para mostrar que até mesmo um júnior (o que eu era na data em que comecei esse projeto, em 08/12/2021) consegue desenvolver algo que possa ser entendido facilmante e resolver todos os problemas acima em projetos back-end utilizando Node.js.  

## O que falta ser feito

TODO  

## Como iniciar o projeto

Construa a imagem do projeto  
```bash
docker build -t node-iniciante-image .
```

Crie uma network  
Essa instrução garante que uma bridge seja criada e os containers possam comunicar-se por alias  
```bash
docker network create node-iniciante
```

> Não gosto de criar projetos "faz tudo", sou bem sistemático em dividir tudo de acordo com sua
> respectiva responsabilidade. Dessa forma, não vejo propósito em manter schema de um BD no projeto, 
> ele não será usado como migration.  
> Saiba que o foco aqui é ser didático, manter tudo o mais bonito possível.

Crie um arquivo que será usado para criar as tebelas e inserir dados no PostgreSQL  
```bash
touch init.sh
```

Insira o seguinte conteúdo no arquivo criado  
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

Crie e inicialize os containers  
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
