import { MongoClient } from "mongodb";

<<<<<<< HEAD
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey
);
=======
const client = new MongoClient(process.env.MONGO_URI); 
let db;
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963

export async function connectDB() {
  await client.connect();
  db = client.db();
  console.log("MongoDB connected");
}

export function getDB() {
  return db;
}
