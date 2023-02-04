# Doc API de Games
Esta API é utilizada para criar uma lista de jogos. É um projeto meu para estudo.
## Endpoints
### GET /games
Esse endpoint é responsavel por retornar uma listagem de todos os jogos cadastrados no banco de dados.
#### Paramêtros
Nenhum
#### Respostas
#### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os jogos.

Exemplo de resposta:
~~~json
[
    {
        "id": 9,
        "title": "Valorant",
        "year": 2020,
        "price": 0
    },
    {
        "id": 11,
        "title": "007 Nightfire",
        "year": 2002,
        "price": 33

    },
    {
        "id": 12,
        "title": "Call of Duty 2",
        "year": 2005,
        "price": 23
    }
]
~~~
#### Falha na autenticação! 401
Caso esssa resposta aconteça, isso significa que houve alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:

~~~json
{
    "erro": "Token inválido"
}
~~~


### POST /user/auth
Esse endpoint é responsavel fazer o processo de login.
#### Paramêtros

email: E-mail do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema.



Exemplo:
~~~json
{
    "email":"email@dominio.com",
    "password":"123456789"
}
~~~
#### Respostas
#### OK! 200
Caso essa resposta aconteça, você vai receber um Token JWT para conseguir acessar endpoints protegidos na API.

Exemplo de resposta:

~~~json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJnbGF5YnNvbm1lbG85OThAZ21haWwuY29tIiwiaWF0IjoxNjc1NTE1NjY4LCJleHAiOjE2NzU2ODg0Njh9.wQe-8JG8G7bFi9_8UrBp2FcUavX96-Bl174CXIwvcUs"
}
~~~

#### Falha na autenticação! 401
Caso esssa resposta aconteça, isso significa que houve alguma falha durante o processo de autenticação da requisição. Motivo: Senha incorreta.
Exemplo de resposta:
~~~json
{
    "erro": "password incorrect"
}
~~~

#### Solicitação inválida! 400
Caso esssa resposta aconteça, isso significa que houve alguma falha durante o processo de autenticação da requisição. Motivo: E-mail não cadastrado.
Exemplo de resposta:
~~~json
{
    "erro": "email not registered"
}
~~~
