import { makeDatabase } from "../src/data-access";
import dotenv from "dotenv";
dotenv.config();
(async function setupDatabase() {
  const database = await makeDatabase();
  const result = await database.collection("agents").createIndexes([
    { key: { hash: 1 }, name: "hash_idx" },
    { key: { agentId: -1 }, name: "agentId_idx" },
  ]);
  console.log(result);
  console.log("Database setup complete...");
  process.exit();
})();
