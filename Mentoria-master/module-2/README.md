# API REST COM PURO NODEJS

Atualmente foi implementado o getAll e o createOne, um sendo o GET para /users e o POST para /users
Falta implementar

```
GET /users/1
PUT /users/1
DELETE /users/1
```

Note que esse "1" está mockado, e deve ser capaz de receber outros parâmetros, como 2,3 e 4.
Tentem implementar lidagem de erros também, caso eu passe um id que não existe soltem um erro 404.

## Modelo de User:

```
{
    id: number,
    name: string
}
```

## Ao baixar:

Ao fazer git clone use o comando:

```
npm install ou yarn
```

Assim você tera baixado as dependências

## Para rodar:

```
yarn start ou npm run start
```
