import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// Person type declaration
type Person = { id: number; firstName: string; lastName: string };

// Mimicking a database with an array
let persons: Person[] = [];

const router = express.Router();

app.use("/api", router);

// GET request to fetch all persons
router.get("/person", (request: Request, response: Response) => {
  response.status(200).send(persons);
});

// GET request to fetch person details by ID
router.get("/person/:id", (request: Request, response: Response) => {
  const { id } = request.params;

  const matchedPerson = persons.find((person) => person.id === parseInt(id));

  if (matchedPerson) {
    response.status(200).send(matchedPerson);
  } else {
    response.status(404).send({ message: "Person not found" });
  }
});

// POST request to create a new person
router.post("/person/:id", (request: Request, response: Response) => {
  const { firstName, lastName } = request.body;
  if (!firstName) {
    response.status(418).send({
      message: "first name must be present",
    });
  }

  if (!lastName) {
    response.status(418).send({
      message: "last name must be present",
    });
  }

  const newPerson: Person = { id: persons.length + 1, firstName, lastName };
  persons.push(newPerson);

  response.status(200).send({
    firstName: `firstName of ${firstName} added`,
    lastName: `lastname of ${lastName} added`,
  });
});

// PUT request to update person details by ID
router.put("/person/:id", (request: Request, response: Response) => {
  const { id } = request.params;

  const { firstName, lastName } = request.body;

  const personIndex = persons.findIndex((person) => person.id === parseInt(id));

  if (personIndex !== -1) {
    if (firstName) {
      persons[personIndex].firstName = firstName;
    }
    if (lastName) {
      persons[personIndex].lastName = lastName;
    }
    response.status(200).send(persons[personIndex]);
  } else {
    response.status(404).send({ message: "Person not found" });
  }
});

// DELETE request to delete person by ID
router.delete("/person/:id", (request: Request, response: Response) => {
  const { id } = request.params;

  const deletePersonIndex = persons.findIndex(
    (person) => person.id === parseInt(id)
  );

  if (deletePersonIndex !== -1) {
    // Remove the person from the array using splice
    persons.splice(deletePersonIndex, 1);
    response
      .status(200)
      .send({ message: `Successfully deleted person with ID ${id}` });
  } else {
    response.status(404).send({ message: "Person not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at Port ${PORT}`);
});
