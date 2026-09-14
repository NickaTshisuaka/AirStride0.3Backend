import { initializeApp, cert, getApps } from "firebase-admin/app";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccountPath = join(
  __dirname,
  "../airstride-3317d-firebase-adminsdk-fbsvc-c61338a4c8.json"
);

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}
