import { config } from "@/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "src/drizzle/migrations",
  schema: "src/drizzle/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: config.DATABASE_URL,
  },
});
