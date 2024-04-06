import express, { Request, Response } from "express";
import Person from "./Schema";

const router = express.Router();

// GET request to fetch all persons
router.get("/person", async (request: Request, response: Response) => {
  const person = await Person.find().exec();
  response.status(200).json(person);
});

// GET request to fetch person details by ID
router.get("/person/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  const matchedPerson = await Person.findById(id).exec();

  if (matchedPerson) {
    response.status(200).json(matchedPerson);
  } else {
    response.status(404).json({ message: "Person not found" });
  }
});

// POST request to create a new person
router.post("/person/:id", async (request: Request, response: Response) => {
  const { firstName, lastName } = request.body;
  if (!firstName) {
    response.status(418).json({
      message: "first name must be present",
    });
  }

  if (!lastName) {
    response.status(418).json({
      message: "last name must be present",
    });
  }

  const newPerson = new Person({
    firstName,
    lastName,
  });

  try {
    await newPerson.save();

    response.status(200).send({
      firstName: `firstName of ${firstName} added`,
      lastName: `lastname of ${lastName} added`,
    });
  } catch (error: unknown) {
    response
      .status(500)
      .json({ message: `Error saving data to database`, error });
  }
});

// PUT request to update person details by ID
router.put("/person/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  const { firstName, lastName } = request.body;

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      id,
      { firstName, lastName },
      { new: true }
    ).exec();
    if (updatedPerson) {
      response
        .status(200)
        .json({ message: `sucessfully updated, ${updatedPerson}` });
    } else {
      response.status(404).json({ messge: `Person with id: ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: `Failed to update Person`, error });
  }
});

// DELETE request to delete person by ID
router.delete("/person/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  try {
    const deletePerson = await Person.findByIdAndDelete(id).exec();
    if (deletePerson) {
      response.status(200).json({
        message: `Successfully deleted person with ID ${id}, ${deletePerson}`,
      });
    } else {
      response.status(404).json({ message: `Person eith id: ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: `Failed to delete Person`, error });
  }
});

export default router;
