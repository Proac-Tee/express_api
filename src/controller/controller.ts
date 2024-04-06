import { Request, Response } from "express";
import Person from "../Schema";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../UserSchema";

// Load environment variables from .env file
dotenv.config();

// Secret key for JWT
const secretKey = process.env.SECRET_KEY || ""; // Access SECRET_KEY from environment variables

const saltRounds = 10;

/**
 * Controller function to get all persons
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const getAllPerson = async (request: Request, response: Response) => {
  // Retrieve all persons from the database
  const person = await Person.find().exec();

  // Respond with the list of persons
  response.status(200).json(person);
};

/**
 * Controller function to get an individual person by ID
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const getIndividualPerson = async (
  request: Request,
  response: Response
) => {
  // Extract ID from request parameters
  const { id } = request.params;

  // Find the person in the database by ID
  const matchedPerson = await Person.findById(id).exec();

  // Check if person was found
  if (matchedPerson) {
    // If person was found, respond with person data
    response.status(200).json(matchedPerson);
  } else {
    // If person was not found, respond with 404 status code and error message
    response.status(404).json({ message: "Person not found" });
  }
};

/**
 * Controller function to sign up a new user
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const signUp = async (request: Request, response: Response) => {
  // Extract email and password from request body
  const { email, password } = request.body;

  // Validate email and password presence
  if (!email) {
    response.status(418).json({ message: "Email must be present" });
    return; // Return to exit the function
  }

  if (!password) {
    response.status(418).json({ message: "Password must be present" });
    return; // Return to exit the function
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    // Generate JWT token
    const accessToken = jwt.sign(
      { email, password: hashedPassword },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    // Create a new user document
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Check if user with the same email already exists
    const user = await User.findOne({ email });

    // If user doesn't exist, save the new user to the database
    if (!user) {
      await newUser.save();
      response.status(200).json({ accessToken });
    } else {
      // If user already exists, respond with 401 status code and error message
      response.status(401).json({ message: "User already exists" });
    }
  } catch (error) {
    // Handle any errors that occur during token generation or database operation
    response.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Controller function to authenticate a user and generate JWT token
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const login = async (request: Request, response: Response) => {
  // Extract email and password from request body
  const { email, password } = request.body;

  // Validate email and password presence
  if (!email) {
    response.status(418).json({ message: "Email must be present" });
    return; // Return to exit the function
  }

  if (!password) {
    response.status(418).json({ message: "Password must be present" });
    return; // Return to exit the function
  }

  // Find the user in the database by email
  const user = await User.findOne({ email });

  // Check if user exists
  if (!user) {
    response.status(401).json({ message: "User not found" });
    return; // Return to exit the function
  }

  try {
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, respond with 401 status code and error message
    if (!passwordMatch) {
      response.status(401).json({ message: "Incorrect password" });
      return; // Return to exit the function
    }

    // If passwords match, generate JWT token
    const accessToken = jwt.sign({ email }, secretKey, {
      expiresIn: "1h",
    });

    // Respond with 200 status code and JWT token
    response.status(200).json({ accessToken });
  } catch (error) {
    // Handle any errors that occur during password comparison or token generation
    response
      .status(500)
      .json({ message: "Error saving data to database", error });
  }
};

/**
 * Controller function to add a new person to the database
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const addNewPerson = async (request: Request, response: Response) => {
  // Extract firstName and lastName from request body
  const { firstName, lastName } = request.body;

  // Validate firstName and lastName presence
  if (!firstName) {
    response.status(418).json({ message: "First name must be present" });
    return; // Return to exit the function
  }

  if (!lastName) {
    response.status(418).json({ message: "Last name must be present" });
    return; // Return to exit the function
  }

  // Create a new person document
  const newPerson = new Person({
    firstName,
    lastName,
  });

  try {
    // Save the new person to the database
    await newPerson.save();

    // Respond with 200 status code and success message
    response.status(200).send({
      message: "Successfully added new Person",
      newPerson,
    });
  } catch (error) {
    // Handle any errors that occur during database operation
    response
      .status(500)
      .json({ message: "Error saving data to database", error });
  }
};

/**
 * Controller function to update a person by ID
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const updatePerson = async (request: Request, response: Response) => {
  const { id } = request.params;

  const { firstName, lastName } = request.body;

  try {
    // Find and update the person by ID
    const updatedPerson = await Person.findByIdAndUpdate(
      id,
      { firstName, lastName },
      { new: true } // Return the updated document
    ).exec();

    // Check if person was found and updated successfully
    if (updatedPerson) {
      // Respond with success message if person was updated
      response
        .status(200)
        .json({ message: `Successfully updated`, updatedPerson });
    } else {
      // Respond with error message if person was not found
      response.status(404).json({ message: `Person with ID: ${id} not found` });
    }
  } catch (error) {
    // Respond with error message if any error occurs during update
    response.status(500).json({ message: `Failed to update person`, error });
  }
};

/**
 * Controller function to delete a person by ID
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const deletePerson = async (request: Request, response: Response) => {
  const { id } = request.params;

  try {
    // Find and delete the person by ID
    const deletePerson = await Person.findByIdAndDelete(id).exec();

    // Check if person was found and deleted successfully
    if (deletePerson) {
      // Respond with success message if person was deleted
      response.status(200).json({
        message: `Successfully deleted person with ID ${id}`,
        deletedPerson: deletePerson, // Optionally, you can include the deleted person in the response
      });
    } else {
      // Respond with error message if person was not found
      response.status(404).json({ message: `Person with ID: ${id} not found` });
    }
  } catch (error) {
    // Respond with error message if any error occurs during deletion
    response.status(500).json({ message: `Failed to delete person`, error });
  }
};
