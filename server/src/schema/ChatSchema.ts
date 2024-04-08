import mongoose, { Document, Schema } from "mongoose";

export interface IChat extends Document {
  chat: string;
  createdAt: Date;
  addedBy: string;
  username: string;
}

const personSchema = new Schema<IChat>({
  chat: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Define createdAt field with default value
  addedBy: { type: String, required: true },
  username: { type: String, required: true },
});

const Chat = mongoose.model("Chat", personSchema);

export default Chat;
