#

<h2 align ='start'> API </h2>

URL heroku

#

<h1 align ='center'> Criar usuário </h1>

`POST /user`

#

### Essa rota precisa passar obrigatoriamente um "name, email, password e isAdm". O isAdm servirá para criação de jogos pois apenas usuários administradores conseguirão criar novos jogos

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

#

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
    "updatedAt": "2022-10-31T19:24:54.115Z"
  },
  {
    "id": "d1e411ea-5b7e-470c-b8fd-3497e30a1298",
    "name": "User 3",
    "email": "user3@gmail.com",
    "age": 25,
    "isAdm": false,
    "isActive": false,
    "createdAt": "2022-10-31T19:38:59.511Z",
    "updatedAt": "2022-10-31T19:40:15.554Z"
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

Caso não passe o token no campo "Authorization"

` FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "Token not found"
}
```

Caso o token esteja errado

` FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "Invalid Token"
}
```

#

<h1 align ='center'> Listar um usuário </h1>

`GET /users/:id`

#

## Essa rota necessita de autenticação

Rotas que necessitam de autenticação devem ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

#

### Retorna apenas o usuário passado pelo id

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 200 OK`

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

Caso não passe o token no campo "Authorization"

` FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "Token not found"
}
```

Caso o token esteja errado

` FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "Invalid Token"
}
```

#

<h1 align ='center'> Atualizar informações do usuário </h1>

`PATCH /users/:id`

#

## Essa rota necessita de autenticação

Rotas que necessitam de autenticação devem ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

#

### Essa rota pode ser atualizado pelo próprio usuário, ou por um usuário administrador. É preciso informar name, email, age ou password para atualizar algum desses campos

## Alguns campos não podem ser atualizados como: isActive, isAdm e id.

```json
{
  "name": "Usuário"
}
```

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 200 OK`

```json
{
  "message": "User updated"
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso tente atualizar algum campo que não pode ser atualizado

`FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "isActive cannot be changed"
}
```

Caso não passe o token no campo "Authorization"

` FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "Token not found"
}
```

Caso o token esteja errado

` FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "Invalid Token"
}
```

#

<h1 align ='center'> Deletar um usuário </h1>

`DELETE /users/:id`

#

## Essa rota necessita de autenticação

Rotas que necessitam de autenticação devem ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

#

### O usuário dono pode deletar apenas o seu próprio usuário, administradores conseguem deletar qualquer usuário.

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 204 NO CONTENT`

```json
No body returned for response
```

<h2 align ='center'> Possíveis erros </h2>

Caso não passe o token no campo "Authorization"

` FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "Token not found"
}
```

Caso o token esteja errado

` FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "Invalid Token"
}
```

#

<h1 align ='center'> Carrinho do usuário </h1>

`POST /cart`

#

## Essa rota necessita de autenticação

Rotas que necessitam de autenticação devem ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

#

### É preciso informar o id do game para conseguir adicionar games ao carrinho

```json
{
  "game_id": "a502eb4a-0697-4e53-ad42-b44c0e25ad5e"
}
```

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 201 CREATED`

```json
{
  "id": "57c60449-c2b0-4b74-bcb1-09a29bc0032b",
  "subtotal": 199.99,
  "games": [
    {
      "id": "a502eb4a-0697-4e53-ad42-b44c0e25ad5e",
      "name": "God of War 2",
      "price": 199.99,
      "age": 18,
      "launch": "2022-10-31",
      "isActive": true,
      "description": "Um jogo muito massa",
      "developer": "ABD",
      "image": "teste"
    }
  ]
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso não passe o token no campo "Authorization"

` FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "Token not found"
}
```

Caso o token esteja errado

` FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "Invalid Token"
}
```

Caso o jogo já esteja no carrinho

` FORMATO DA RESPOSTA - STATUS 409 CONFLICT`

```json
{
  "message": "Game is already in the cart"
}
```

Caso o id de game esteja errado

` FORMATO DA RESPOSTA - STATUS 404 NOT FOUND`

```json
{
  "message": "Game not found"
}
```

#

<h1 align ='center'> Listar todos os games do usuário no carrinho </h1>

`GET /cart`

#

## Essa rota necessita de autenticação

Rotas que necessitam de autenticação devem ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

#

### Retorna todos os games colocados no carrinho do usuário

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 200 OK`

```json
{
  "id": "57c60449-c2b0-4b74-bcb1-09a29bc0032b",
  "subtotal": 199.99,
  "games": [
    {
      "id": "a502eb4a-0697-4e53-ad42-b44c0e25ad5e",
      "name": "God of War 2",
      "price": 199.99,
      "age": 18,
      "launch": "2022-10-31",
      "isActive": true,
      "description": "Um jogo muito massa",
      "developer": "ABD",
      "image": "teste"
    }
  ]
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso não passe o token no campo "Authorization"

` FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "Token not found"
}
```

Caso o token esteja errado

` FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "Invalid Token"
}
```

#

<h1 align ='center'> Deletar o game no carrinho do usuário </h1>

`DELETE /cart/game_id`

#

## Essa rota necessita de autenticação

Rotas que necessitam de autenticação devem ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

#

### Deleta um game através do id do game do carrinho

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 204 NO CONTENT`

```json
No body returned for response
```

<h2 align ='center'> Possíveis erros </h2>

Caso não passe o token no campo "Authorization"

` FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "Token not found"
}
```

Caso o token esteja errado

` FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "message": "Invalid Token"
}
```
