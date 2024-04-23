import mongoose from "mongoose"

const dbConfig = async () => {
  if (!process.env.DB_URI) {
    console.error("DB_URL is not defined in your environment variables")
    process.exit(1) // Exit the process with an error code
  }

  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      dbName: "dashify",
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
    return conn.connection
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export default dbConfig