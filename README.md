# Express API

This TypeScript application leverages the Express.js framework to implement a basic CRUD (Create, Read, Update, Delete) API for managing a collection of persons. The application utilizes MongoDB as its database to store person objects, each containing an id, firstName, and lastName. The API exposes endpoints to perform CRUD operations on this collection.

## Tech Stack

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

[![REST API](https://img.shields.io/badge/REST_API-000000?style=for-the-badge)](https://en.wikipedia.org/wiki/Representational_state_transfer)

[![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/download)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## Installation

You need a Node.js runtime installed to run this api locally

#### 🔗 Click Link to install Node.js

[![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/download)

## Run Locally

Clone the project

```bash
  git clone git clone https://github.com/Proac-Tee/express_api.git
```

Go to the project directory

```bash
  cd express_api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. rename the envExample as .env

`MONGODB_URI=---`

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
