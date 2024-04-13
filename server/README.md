# Express API

This TypeScript application leverages the Express.js framework to implement a basic CRUD (Create, Read, Update, Delete) API for managing a collection of chats. The application utilizes MongoDB as its database to store person objects, each containing an id, chat. The API exposes endpoints to perform CRUD operations on this collection. Italso offers users rregistration by leveraging jwt for authentication, session management, user roles and permissions.

## Tech Stack

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![REST API](https://img.shields.io/badge/REST_API-000000?style=for-the-badge)](https://en.wikipedia.org/wiki/Representational_state_transfer)
[![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/download)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## Installation

You need a Node.js runtime installed, a MongoDB.js database server and a function to generete secret key to run this api locally

#### 🔗 Click Link to install Node.js

[![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/download)

#### 🔗 Click Link to setup MongoDB database

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

#### To generate secret key

To generate a secret key for your application, follow these steps:

    1.  Navigate to Source Directory: Go to the `/src` directory of your project.

    2.  Find the `generateSecretKey`. This function utilizes the `crypto` module from Node.js to generate a random secret key.

    3.  Call the Function: Call the `generateSecretKey` function to generate a unique secret key. You can do this by simply invoking the function.

    4.  Store the Secret Key: Once generated, store the secret key securely. It's recommended to store it in your environment variables file `(.env)` to keep it confidential. This secret key will be used for cryptographic operations in your application.

### Usage/Examples

```javascript
import { generateSecretKey } from "./src/generateSecretKey";

// Generate a secret key
const secretKey = generateSecretKey();

// Log the secret key
console.log("Generated Secret Key:", secretKey);
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. rename the envExample as .env

`MONGODB_URI=---URI OF DATABASE---`
`SECRET_KEY=---SECRET KEY GENERATED---`

## Run Locally

Clone the project

```bash
  git clone git clone https://github.com/Proac-Tee/express_api.git
```

Go to the project directory

```bash
  cd express_api/server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

### File structure of important files

```sh
src/
├── authenticateToken.ts
├── index.ts
├── generateSecretKey.ts
├── controller/
│ └── controller.ts
├── router/
│ └── routes.ts
└── schema/
├── ChatSchema.ts
└── UserSchema.ts
```

## API Reference

#### Get all chat

```http
  GET /api/chat
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| none      | `string` | **Required**. Your API key |

#### Get chat by ID

```http
  GET /api/chat/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### signup user

```http
  POST /auth/login
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. user email    |
| `password` | `string` | **Required**. user password |

#### login user

```http
  POST /auth/signup
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. user email    |
| `password` | `string` | **Required**. user password |

#### Create a new chat

```http
  POST /api/chat
```

| Parameter  | Type     | Description                                                                                       |
| :--------- | :------- | :------------------------------------------------------------------------------------------------ |
| `addedBy`  | `string` | **Required**. uId of user chat to post                                                            |
| `chat`     | `string` | **Required**. chat input to post                                                                  |
| `username` | `string` | **Required**. randomly generated username to post if not given a randomly generated one is giving |

#### Update person by ID

```http
  PUT /api/chat/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of chat to update |
| `chat`    | `string` | **Required**. chat input to update |

#### Delete person by ID

```http
  DELETE /api/chat/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of chat to delete |

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
    chat: "John",
  },
  {
    id: 2,
    chat: "Jane",
  },
];
```

#### Request:

```javascript
POST /api/person/3
Content-Type: application/json

{
  " chat": "Johnny",
}

```

#### Response:

```javascript
{
  "id": 3,
  "chat": "Jonny",
}

```
