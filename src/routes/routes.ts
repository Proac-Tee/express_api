import express from "express";
import authenticateToken from "../authenticateToken";

import {
  addNewChat,
  deleteChat,
  getAllChat,
  getIndividualChat,
  logOut,
  login,
  signUp,
  updateChat,
} from "../controller/controller";

const router = express.Router();

const auth = express.Router();

// GET request to fetch all persons
router.get("/chat", getAllChat);

// GET request to fetch person details by ID
router.get("/chat/:id", authenticateToken, getIndividualChat);

// Generate and return JWT upon successful user sign in authentication
auth.post("/signup", signUp);

// Generate and return JWT upon successful user login authentication
auth.post("/login", login);

// Destrot JWT  section upon successful user logout authentication
auth.post("/logout", logOut);

// POST request to create a new person
router.post("/chat/:id", authenticateToken, addNewChat);

// PUT request to update person details by ID
router.put("/chat/:id", authenticateToken, updateChat);

// DELETE request to delete person by ID
router.delete("/chat/:id", authenticateToken, deleteChat);

export { router, auth };
