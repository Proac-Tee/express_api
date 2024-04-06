import express from "express";
import authenticateToken from "../authenticateToken";

import {
  addNewPerson,
  deletePerson,
  getAllPerson,
  getIndividualPerson,
  login,
  signUp,
  updatePerson,
} from "../controller/controller";

const router = express.Router();

// GET request to fetch all persons
router.get("/person", authenticateToken, getAllPerson);

// GET request to fetch person details by ID
router.get("/person/:id", authenticateToken, getIndividualPerson);

// Generate and return JWT upon successful user sign in authentication
router.post("/signup", signUp);

// Generate and return JWT upon successful user login authentication
router.post("/login", login);

// POST request to create a new person
router.post("/person/:id", authenticateToken, addNewPerson);

// PUT request to update person details by ID
router.put("/person/:id", authenticateToken, updatePerson);

// DELETE request to delete person by ID
router.delete("/person/:id", authenticateToken, deletePerson);

export default router;
