# Address API Spec

## Create Address API

Endpoint: POST /api/contacts/:contactId/addresses

Headers:
- Authorization: token

Request Body:

```json
{
  "street": "Jalan",
  "city": "Kota",
  "province": "provinsi",
  "country": "negara",
  "postalCode": "kode post"
}
```

Response Body Success:

```json
{
  "data":{
    "id": 1,
    "street": "Jalan",
    "city": "Kota",
    "province": "provinsi",
    "country": "negara",
    "postalCode": "kode post"
  }
}
```

Response Body Error:

```json
{
  "error": "data not complete"
}
```

## Update Address API

Endpoint: PUT /api/contacts/:contactId/addresses/:addressId

Headers:
- Authorization: token

RRequest Body:

```json
{
  "street": "Jalan",
  "city": "Kota",
  "province": "provinsi",
  "country": "negara",
  "postalCode": "kode post"
}
```

Response Body Success:

```json
{
  "data":{
    "id": 1,
    "street": "Jalan",
    "city": "Kota",
    "province": "provinsi",
    "country": "negara",
    "postalCode": "kode post"
  }
}
```

Response Body Error:

```json
{
  "error": "data not complete"
}
```

## Get Address API

Endpoint: GET /api/contacts/:contactId/addresses/:addressId

Headers:
- Authorization: token

Response Body Success:

```json
{
  "data":{
    "id": 1,
    "street": "Jalan",
    "city": "Kota",
    "province": "provinsi",
    "country": "negara",
    "postalCode": "kode post"
  }
}
```

Response Body Error:

```json
{
  "error": "contact not found"
}
```

## List Address API

Endpoint: GET /api/contacts/:contactId/addresses

Headers:
- Authorization: token

Response Body Success:

```json
{
  "data":[
    {
      "id": 1,
      "street": "Jalan",
      "city": "Kota",
      "province": "provinsi",
      "country": "negara",
      "postalCode": "kode post"
    },
    {
      "id": 2,
      "street": "Jalan",
      "city": "Kota",
      "province": "provinsi",
      "country": "negara",
      "postalCode": "kode post"
    },
  ]
}
```

Response Body Error:

```json
{
  "error": "contact not found"
}
```

## Remove Address API

Endpoint: DELETE /api/contacts/:contactId/addresses/:addressId

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
  "error": "address not found"
}
```