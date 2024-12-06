# Contact API Spec

## Create Contact API

Endpoint: POST /api/contacts

Headers:
- Authorization: token

Request Body:

```json
{
  "firstName": "Han",
  "lastName": "Iman",
  "email": "han@mail.com"
  "phone": 62123456789
}
```

Response Body Success:

```json
{
  "data":{
    "id": 1,
    "firstName": "Han",
    "lastName": "Iman",
    "email": "han@mail.com",
    "phone": 62123456789
  }
}
```

Response Body Error:

```json
{
  "errors": "Email is not valid"
}
```

## Update Contact API

Endpoint: PUT /api/contacts/:id

Headers:
- Authorization: token

Request Body:

```json
{
  "firstName": "Han",
  "lastName": "Iman",
  "email": "han@mail.com"
  "phone": 62123456789
}
```

Response Body Success:

```json
{
  "data":{
    "id": 1,
    "firstName": "Han",
    "lastName": "Iman",
    "email": "han@mail.com",
    "phone": 62123456789
  }
}
```

Response Body Error:

```json
{
  "errors": "Email is not valid"
}
```

## Get Contact API

Endpoint: GET /api/contacts/:id

Headers:
- Authorization: token

Response Body Success:

```json
{
  "data":{
    "id": 1,
    "firstName": "Han",
    "lastName": "Iman",
    "email": "han@mail.com",
    "phone": 62123456789
  }
}
```

Response Body Error:

```json
{
  "errors": "Contact is not found"
}
```


## Search Contact API

Endpoint: GET /api/contacts

Headers:
- Authorization: token

Querry params:
- name: Search by firstName or lastName, using like, optional
- email: Search by email using like, optional
- phone: Search by phone using like, optional
- page: number of page, default 1
- size: size per page, default 10

Response Body Success:

```json
{
  "data":[
    {
    "id": 1,
    "firstName": "Han",
    "lastName": "Iman",
    "email": "han@mail.com",
    "phone": 62123456789
    },
    {
      "id": 2,
      "firstName": "Han",
      "lastName": "Iman",
      "email": "han@mail.com",
      "phone": 62123456789
    }
  ],
  "paging":{
    "page": 1,
    "totalPage": 3,
    "totalItem": 30,
  }
}
```

## Delete Contact API

Endpoint: DELETE /api/contacts/:id

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
  "errors": "Contact is not found"
}
```