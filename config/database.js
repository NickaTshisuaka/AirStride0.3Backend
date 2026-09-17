import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey
);

export async function connectDB() {
  const { error } = await supabase
    .from("orders")
    .select("id")
    .limit(1);

  if (error) {
    console.error("Supabase connection failed:", error.message);
    throw error;
  }

  console.log("Supabase connected");
}