import mongoose from "mongoose"

const tempSchema = new mongoose.Schema({
  end_year: Number,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: Number,
  impact: String,
  added: { type: Date, default: Date.now },
  published: Date,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
})

export default mongoose.model("temp", tempSchema, "temp")
