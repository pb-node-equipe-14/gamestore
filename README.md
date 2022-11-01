# node-pb-equipe14

<h2 align ='start'> API </h2>

URL heroku

<h1 align ='center'> Criar usuário </h1>

### Essa rota precisa passar obrigatoriamente um "name, email, password e isAdm". O isAdm servirá para criação de jogos pois apenas usuários administradores conseguirão criar novos jogos

`POST /user`

```json
{
  "name": "User",
  "email": "user@gmail.com",
  "age": 28,
  "password": "123",
  "isAdm": true
}
```

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 201 CREATED`

```json
{
  "id": "15a8e5db-7e96-42e1-bee5-fca963f5ed47",
  "name": "User",
  "email": "user@gmail.com",
  "age": 28,
  "isAdm": true,
  "isActive": true,
  "createdAt": "2022-10-31T14:48:53.752Z",
  "updatedAt": "2022-10-31T14:48:53.752Z"
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso já tenha e-mail cadastrado

` FORMATO DA RESPOSTA - STATUS 400 BAD REQUEST`

```json
{
  "message": "Email Already Exists"
}
```

Caso não tenha preenchido o "name", email, age, password ou isAdm

` FORMATO DA RESPOSTA - STATUS 400 BAD REQUEST`

```json
{
  "message": "name is a required field"
}
```

#

<h1 align ='center'> Login usuário </h1>

`POST /login`

```json
{
  "email": "user@gmail.com",
  "password": "123"
}
```

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 201 CREATED`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imlnb3IzQGdtYWlsLmNvbSIsImlhdCI6MTY2NzMwNjg2MywiZXhwIjoxNjY3MzkzMjYzLCJzdWIiOiI2MDEwZGFlNy00NmM3LTRkMDMtYWEyYS1mZmY0OGVlZDgyNDQifQ.ILJAeWbdpucEqsdWow198hFFKJ6u3be2hTLnVp3kI2E"
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso o e-mail ou senha estejam errados

` FORMATO DA RESPOSTA - STATUS 403 FORBIDDEN`

```json
{
  "message": "Wrong email/password"
}
```

Caso o usuário não esteja ativo

` FORMATO DA RESPOSTA - STATUS 400 BAD REQUEST`

```json
{
  "message": "User isn't active"
}
```

#

<h1 align ='center'> Listar todos os usuários </h1>

`GET /users`

#

## Essa rota necessita de autenticação

Rotas que necessitam de autenticação devem ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

#

### Retorna todos os usuários criados na API, porém apenas usuários administradores conseguem acessar essa rota

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 200 OK`

```json
[
  {
    "id": "15a8e5db-7e96-42e1-bee5-fca963f5ed47",
    "name": "User",
    "email": "user@gmail.com",
    "age": 28,
    "isAdm": true,
    "isActive": true,
    "createdAt": "2022-10-31T14:48:53.752Z",
    "updatedAt": "2022-10-31T14:48:53.752Z"
  },
  {
    "id": "66c98b40-7623-4819-8238-4501fb1cd2b9",
    "name": "User 2",
    "email": "user2@gmail.com",
    "age": 20,
    "isAdm": false,
    "isActive": true,
    "createdAt": "2022-10-31T19:24:54.115Z",
    "updatedAt": "2022-10-31T19:38:30.496Z"
  },
  {
    "id": "d1e411ea-5b7e-470c-b8fd-3497e30a1298",
    "name": "User 3",
    "email": "user3@gmail.com",
    "age": 25,
    "isAdm": false,
    "isActive": false,
    "createdAt": "2022-10-31T19:38:59.511Z",
    "updatedAt": "2022-10-31T19:39:27.580Z"
  }
]
```

<h2 align ='center'> Possíveis erros </h2>

Caso o usuário não seja administrador

` FORMATO DA RESPOSTA - STATUS 403 FORBIDDEN`

```json
{
  "message": "User is not admin"
}
```

Caso o usuário não seja administrador

` FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "Token not found"
}
```

#

<h1 align ='center'> Atualizar informações do usuário </h1>

### Essa rota pode ser atualizado pelo próprio usuário, ou por um usuário administrador. Alguns campos não podem ser atualizados como: isActive, isAdm e id

`PATCH /users/:id`
