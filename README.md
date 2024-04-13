## Chat forum App

This TypeScript application harnesses the power of Express.js framework to create a robust CRUD (Create, Read, Update, Delete) API tailored for managing a collection of chats. MongoDB serves as the backend database, storing person objects, each characterized by an id and chat data. The API provides endpoints for seamless CRUD operations on this collection. Additionally, it incorporates user registration functionality with JWT (JSON Web Token) for secure authentication, session management, and implementation of user roles and permissions. To showcase the API, Vue.js version 3 (Vue 3) was employed.

## About the Stack

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![REST API](https://img.shields.io/badge/REST_API-000000?style=for-the-badge)](https://en.wikipedia.org/wiki/Representational_state_transfer)
[![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/download)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vuex](https://img.shields.io/badge/Vuex-42b883?style=for-the-badge&logo=vuex&logoColor=white)](https://vuex.vuejs.org/)
[![Vue Router](https://img.shields.io/badge/Vue_Router-42b883?style=for-the-badge&logo=vue-router&logoColor=white)](https://router.vuejs.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

---

## Setting up the Backend

`navigate to /server to see setup instructions`

---

## Setting up the Frontend

`navigate to /client to see setup instructions`

### File struture of important files

```sh
express_app/
├── client/
│ ├── src/
│ │ ├── App.vue
│ │ ├── index.ts
│ │ ├── main.ts
│ │ ├── router.ts
│ │ ├── style.css
│ │ ├── assets/
│ │ │ └── (static assets)
│ │ └── components/
│ │ ├── Header.vue
│ │ ├── GetStarted.vue
│ │ ├── Login.vue
│ │ └── Messages.vue
└── server/
├── src/
│ ├── authenticateToken.ts
│ ├── generateSecretKey.ts
│ ├── index.ts
│ ├── controller/
│ │ └── controller.ts
│ ├── router/
│ │ └── routes.ts
│ └── schema/
│ ├── ChatSchema.ts
│ └── UserSchema.ts
```
