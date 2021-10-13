import { makeDb } from "../src/data-access";
import dotenv from "dotenv";
dotenv.config();
(async function setupDb() {
  const db = await makeDb();
  const result = await db.collection("agents").createIndexes([
    { key: { hash: 1 }, name: "hash_idx" },
    { key: { agentId: -1 }, name: "agentId_idx" },
  ]);
  console.log(result);
  console.log("Database setup complete...");
  process.exit();
})();
