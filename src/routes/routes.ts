import express from "express";
import authenticateToken from "../authenticateToken";

import {
  addNewPerson,
  deletePerson,
  getAllPerson,
  getIndividualPerson,
  logOut,
  login,
  signUp,
  updatePerson,
} from "../controller/controller";

const router = express.Router();

const auth = express.Router();

// GET request to fetch all persons
router.get("/person", getAllPerson);

// GET request to fetch person details by ID
router.get("/person/:id", authenticateToken, getIndividualPerson);

// Generate and return JWT upon successful user sign in authentication
auth.post("/signup", signUp);

// Generate and return JWT upon successful user login authentication
auth.post("/login", login);

// Destrot JWT  section upon successful user logout authentication
auth.post("/logout", logOut);

// POST request to create a new person
router.post("/person/:id", authenticateToken, addNewPerson);

// PUT request to update person details by ID
router.put("/person/:id", authenticateToken, updatePerson);

// DELETE request to delete person by ID
router.delete("/person/:id", authenticateToken, deletePerson);

export { router, auth };
