# Express API

This TypeScript application leverages the Express.js framework to implement a basic CRUD (Create, Read, Update, Delete) API for managing a collection of persons. The application utilizes an in-memory array as a simple database to store person objects, each containing an id, firstName, and lastName. The API exposes endpoints to perform CRUD operations on this collection.

### Clone the repository

```bash
git clone https://github.com/Proac-Tee/express_api.git
```

## Installation

To install this API, follow these steps:

_Navigate to the project directory:_

```bash
  cd express_api
```

_Install dependencies using npm:_

```bash
  npm install
```

_To start run:_

```bash
  npm start
```

## API Reference

#### Get all persons

```http
  GET /api/person
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| none      | `string` | **Required**. Your API key |

#### Get person by ID

```http
  GET /api/person/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Create a new person

```http
  POST /api/person/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of person to post |

#### Update person by ID

```http
  PUT /api/person/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of person to update |

#### Delete person by ID

```http
  DELETE /api/person/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of person to delete |

## Usage/Examples

#### Request:

```javascript
GET / api / person;
```

#### Response:

```javascript
[
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
  },
];
```

#### Request:

```javascript
POST /api/person/3
Content-Type: application/json

{
  "firstName": "Alice",
  "lastName": "Johnson"
}

```

#### Response:

```javascript
{
  "id": 3,
  "firstName": "Alice",
  "lastName": "Johnson"
}

```
