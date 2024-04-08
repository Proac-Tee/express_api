import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  username: { type: String },
});

// Function to generate a random username
const generateRandomUsername = (): string => {
  const adjectives = [
    "happy",
    "sad",
    "lucky",
    "brave",
    "clever",
    "kind",
    "wise",
    "calm",
  ];
  const nouns = [
    "cat",
    "dog",
    "rabbit",
    "lion",
    "tiger",
    "bird",
    "fish",
    "turtle",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective}_${randomNoun}_${Math.floor(
    Math.random() * 10000
  )}`;
};

userSchema.pre<IUser>("save", function (next) {
  if (!this.username) {
    this.username = generateRandomUsername();
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
