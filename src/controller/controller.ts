import { Request, Response } from "express";
import Person from "../Schema";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../UserSchema";

dotenv.config();

// Secret key for JWT
const secretKey = process.env.SECRET_KEY || "";

const saltRounds = 10;

export const getAllPerson = async (request: Request, response: Response) => {
  const person = await Person.find().exec();
  response.status(200).json(person);
};

export const getIndividualPerson = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  const matchedPerson = await Person.findById(id).exec();

  if (matchedPerson) {
    response.status(200).json(matchedPerson);
  } else {
    response.status(404).json({ message: "Person not found" });
  }
};

export const signUp = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  if (!email) {
    response.status(418).json({
      message: "email must be present",
    });
  }

  if (!password) {
    response.status(418).json({
      message: "password must be present",
    });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const accessToken = jwt.sign(
      { email, password: hashedPassword },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const user = await User.findOne({ email });

    if (!user) {
      await newUser.save();
      response.status(200).json({ accessToken });
    } else {
      return response.status(401).json({ message: "User already exit" });
    }
  } catch (error: unknown) {
    // Handle any errors that occur during token generation
    response.status(500).json({ message: "Internal Server Error", error });
  }
};

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  if (!email) {
    response.status(418).json({
      message: "email must be present",
    });
  }

  if (!password) {
    response.status(418).json({
      message: "password must be present",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return response.status(401).json({ message: "User not found" });
  }

  try {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return response.status(401).json({ message: "Incorrect password" });
    }

    // If the password matches, generate and return a JWT token
    const accessToken = jwt.sign({ email }, secretKey, {
      expiresIn: "1h",
    });

    response.status(200).json({ accessToken });
  } catch (error: unknown) {
    response
      .status(500)
      .json({ message: `Error saving data to database`, error });
  }
};

export const addNewPerson = async (request: Request, response: Response) => {
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
};

export const updatePerson = async (request: Request, response: Response) => {
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
};

export const deletePerson = async (request: Request, response: Response) => {
  const { id } = request.params;

  try {
    const deletePerson = await Person.findByIdAndDelete(id).exec();
    if (deletePerson) {
      response.status(200).json({
        message: `Successfully deleted person with ID ${id}, ${deletePerson}`,
      });
    } else {
      response.status(404).json({ message: `Person with id: ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: `Failed to delete Person`, error });
  }
};
