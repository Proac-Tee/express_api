import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../schema/UserSchema";
import Chat from "../schema/ChatSchema";

// Load environment variables from .env file
dotenv.config();

// Secret key for JWT
const secretKey = process.env.SECRET_KEY || ""; // Access SECRET_KEY from environment variables

const saltRounds = 10;

const maxAge = 14 * 24 * 60 * 60;

/**
 * Controller function to get all Chats
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const getAllChat = async (request: Request, response: Response) => {
  // Retrieve all chats from the database
  const chat = await Chat.find().exec();

  // Respond with the list of chats
  response.status(200).json(chat);
};

/**
 * Controller function to get an individual chat by ID
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const getIndividualChat = async (
  request: Request,
  response: Response
) => {
  // Extract ID from request parameters
  const { id } = request.params;

  // Find the Chat in the database by ID
  const matchedChat = await Chat.findById(id).exec();

  // Check if chat was found
  if (matchedChat) {
    // If chat was found, respond with chat data
    response.status(200).json(matchedChat);
  } else {
    // If chat was not found, respond with 404 status code and error message
    response.status(404).json({ message: "Chat not found" });
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
    const accessToken = jwt.sign({ email }, secretKey, {
      expiresIn: maxAge,
    });

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

      response.cookie("expressApiToken", accessToken, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });

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
      expiresIn: maxAge,
    });

    response.cookie("expressApiToken", accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
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
 * Controller function to logout a user and destroy JWT token session
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const logOut = async (request: Request, response: Response) => {
  try {
    const cookies = request.cookies;

    if (!cookies?.expressApiToken) return response.sendStatus(204);

    response.clearCookie("expressApiToken", {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    response.status(200).json({ message: "Logout successful" });
  } catch (error) {
    response.status(500).json({ message: "Error logging out", error });
  }
};

/**
 * Controller function to add a new chat to the database
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const addNewChat = async (request: Request, response: Response) => {
  // Extract firstName and lastName from request body
  const { chat } = request.body;

  // Validate firstName and lastName presence
  if (!chat) {
    response.status(418).json({ message: "Chat cannot be empty" });
    return; // Return to exit the function
  }

  // Create a new Chat document
  const newChat = new Chat({
    chat,
  });

  try {
    // Save the new chat to the database
    await newChat.save();

    // Respond with 200 status code and success message
    response.status(200).send({
      message: "Successfully added new Chat",
      newChat,
    });
  } catch (error) {
    // Handle any errors that occur during database operation
    response
      .status(500)
      .json({ message: "Error saving data to database", error });
  }
};

/**
 * Controller function to update a Chat by ID
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const updateChat = async (request: Request, response: Response) => {
  const { id } = request.params;

  const { chat } = request.body;

  try {
    // Find and update the Chat by ID
    const updatedChat = await Chat.findByIdAndUpdate(
      id,
      { chat },
      { new: true } // Return the updated document
    ).exec();

    // Check if Chat was found and updated successfully
    if (updatedChat) {
      // Respond with success message if Chat was updated
      response
        .status(200)
        .json({ message: `Successfully updated`, updatedChat });
    } else {
      // Respond with error message if Chat was not found
      response.status(404).json({ message: `Chat with ID: ${id} not found` });
    }
  } catch (error) {
    // Respond with error message if any error occurs during update
    response.status(500).json({ message: `Failed to update Chat`, error });
  }
};

/**
 * Controller function to delete a Chat by ID
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const deleteChat = async (request: Request, response: Response) => {
  const { id } = request.params;

  try {
    // Find and delete the Chat by ID
    const deleteChat = await Chat.findByIdAndDelete(id).exec();

    // Check if Chat was found and deleted successfully
    if (deleteChat) {
      // Respond with success message if Chat was deleted
      response.status(200).json({
        message: `Successfully deleted Chat with ID ${id}`,
        deletedChat: deleteChat, // Optionally, you can include the deleted Chat in the response
      });
    } else {
      // Respond with error message if Chat was not found
      response.status(404).json({ message: `Chat with ID: ${id} not found` });
    }
  } catch (error) {
    // Respond with error message if any error occurs during deletion
    response.status(500).json({ message: `Failed to delete Chat`, error });
  }
};
