# 🚗 API para Reserva de Carros

  Esta API foi desenvolvida para o teste de desenvolvedor Back-End na HappMobi

## 🎯 Especificações
  ✔ Rotas de usuários, carros e reservas
  ✔ Login e registro
  ✔ Proteção das Rotas Privadas
  ✔ Documentação com Swagger
  ✔ Implantação de testes
  
## 🧑🏻‍💻 Técnologias utilizadas
- ### NodeJs (18.15)
- ### NestJS (9.0)
- ### Mongoose (8.5)
- ### Jest (8.5)
  Outras:
- ### Moment (2.30.1)
- ### JWT Passport (4.0.1)
- ### Swagger (5.0.1)
  
## ⚙️ Documentação Swagger
  A documentação completa com Swagger pode ser acessada em {{url}}/docs
  Além disso, toda a Collection do postman está disponível para testes no arquivo ```postman-collection.js```

#### Variáveis de ambiente
  Para execução docódigo são necessárias algumas variaveis de espaço, por isto, um exemplo utilizável com dotenv está em ```.env.example```, bastando renomea-lo para ".env" para que seja usado.

#### Sobre o projeto
  Projeto desenvolvido em NestJs pela sua versatibilidade e facilidade de escala se necessário, graças a sua arquitetura modular.
  O código conta com testes unitários Jest, autenticação JWT e guards de rotas publicas e privadas através do token, além de tratativa personalizada de erros.
  
  Foi utilizado uma estrutura de pastas seguindo Clean Architecture, que pode ser melhor entendido abaixo:
                         -----------------------------
                        |        Presentation        |
                        |----------------------------|
                        |                            |
                        | Controllers, Decoratos     |
                        | responses                  |
                         ----------------------------
                                    |
                                    v
                         ----------------------------
                        |        Application         |
                        |----------------------------|
                        |                            |
                        | DTOs, Services             |
                        | Regras de negócio          |
                         ----------------------------
                                    |
                                    v
                         ----------------------------
                        |           Domain           |
                        |----------------------------|
                        |                            |
                        | Entities, Modules          |
                        | Mongo Providers            |
                         ----------------------------
                                    |
                                    v
                         ----------------------------
                        |        Infrastructure      |
                        |----------------------------|
                        |                            |
                        | Database config,  Models   |
                        | Repositories,              |
                         ----------------------------

  Toda a camada de lógica está presente nas camadas Service.
  
## ✏️ Iniciando o Projeto

Para iniciar o projeto, abra o seu terminal na pasta em que ele se encontra e digite:

```bash
  npm install
  or
  yarn
```

Para rodar os testes:

```bash
  npm run test
  or
  yarn test
```

Para iniciar o projeto:

```bash
  npm run start
  or
  yarn start
```

Para iniciar o projeto em modo de apuração:

```bash
  npm run start:dev
  or
  yarn start:dev
```

## 🧑🏻‍🎨 Autor
- Bruno Henrique Gomes
  
## 🏷️ Tags
![Typescript](https://img.shields.io/badge/Typescript-grey?logo=typescript)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Git](https://img.shields.io/badge/Git-grey?logo=git)
![Jest](https://img.shields.io/badge/Jest-grey?logo=jest)
