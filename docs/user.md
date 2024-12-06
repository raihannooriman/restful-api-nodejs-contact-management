# User API Spec

## Register User API

Endpoint: POST /api/users

Request Body:

```json
{
  "username": "han",
  "password": "secret",
  "name": "Han"
}
```

Response Body Success:

```json
{
  "data": {
    "username": "han",
    "name": "Han"
  },
}
```

Response Body Error:

```json
{
  "error": "Error or username already registered"
}
```

## Login User API

Endpoint: POST /api/users/login

Request Body:

```json
{
  "username": "han",
  "password": "secret"
}
```

Response Body Success:

```json
{
  "data": {
    "token": "unique-token"
  },
}
```

Response Body Error:

```json
{
   "error": "Username or password wrong"
}
```

## Update User API

Endpoint: PATCH /api/users/current

Headers:
- Authorization: token

Request Body:

```json
{
  "name": "Han New", // optional
  "password": "new password", //optional
}
```

Response Body Success:

```json
{
  "data": {
    "username": "han",
    "name": "Han New"
  },
}
```

Response Body Error:

```json
{
  "error": "Error"
}
```

## Get User API

Endpoint: GET /api/users/current

Headers:
- Authorization: token

Response Body Success:

```json
{
  "data": {
    "username": "han",
    "name": "Han"
  },
}
```

Response Body Error:

```json
{
   "error": "Unauthorized"
}
```

## Logout User API

Endpoint: DELETE /api/users/logout

Headers:
- Authorization: token

Response Body Success:

```json
{
  "data": "OK"
}
```

Response Body Error:

```json
{
   "error": "Unauthorized"
}
```