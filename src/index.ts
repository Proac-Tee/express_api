import express, { Request, Response, response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// Person type declaration
type Person = { id: number; firstName: string; lastName: string };

// Mimicking a database with an array
let person: Person[] = [];

// GET request to fetch all persons
app.get("/person", (request: Request, response: Response) => {
  response.status(200).send(person);
});

// GET request to fetch person details by ID
app.get("/person/:id", (request: Request, response: Response) => {
  const { id } = request.params;

  const matchedPerson = person.find((person) => person.id === parseInt(id));

  if (matchedPerson) {
    response.status(200).send(matchedPerson);
  } else {
    response.status(404).send({ message: "Person not found" });
  }
});

// POST request to create a new person
app.post("/person/:id", (request: Request, response: Response) => {
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

  const newPerson: Person = { id: person.length + 1, firstName, lastName };
  person.push(newPerson);

  response.status(200).send({
    firstName: `firstName of ${firstName} added`,
    lastName: `lastname of ${lastName} added`,
  });
});

// PUT request to update person details by ID
app.put("/person/:id", (request: Request, response: Response) => {
  const { id } = request.params;

  const { firstName, lastName } = request.body;

  const personIndex = person.findIndex((person) => person.id === parseInt(id));

  if (personIndex !== -1) {
    if (firstName) {
      person[personIndex].firstName = firstName;
    }
    if (lastName) {
      person[personIndex].lastName = lastName;
    }
    response.status(200).send(person[personIndex]);
  } else {
    response.status(404).send({ message: "Person not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at Port ${PORT}`);
});
