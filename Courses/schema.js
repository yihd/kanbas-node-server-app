import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    id: String,
    description: String,
    startDate: Date,
    endDate: Date,
    image: String
  },
  { collection: "courses" });
export default courseSchema;