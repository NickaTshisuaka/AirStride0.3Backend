import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl) {
  throw new Error("SUPABASE_URL is missing from environment variables");
}

if (!supabaseKey) {
  throw new Error("Supabase secret or service key is missing from environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
