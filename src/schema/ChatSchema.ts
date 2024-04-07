import mongoose, { Document, Schema } from "mongoose";

export interface IChat extends Document {
  chat: string;
}

const personSchema = new Schema<IChat>({
  chat: { type: String, required: true },
});

const Chat = mongoose.model("Chat", personSchema);

export default Chat;
