import mongoose, { Document, Schema } from "mongoose";

export interface IPerson extends Document {
  firstName: string;
  lastName: string;
}

const personSchema = new Schema<IPerson>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const Person = mongoose.model("Person", personSchema);

export default Person;
