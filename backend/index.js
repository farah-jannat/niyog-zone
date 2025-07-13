import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import http from "http"; // Add this line

// ** Graphql imports

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"; // Import expressMiddleware
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"; // Recommended for graceful shutdown

import typeDefs from "./graphql/schemas/index.js"; // <--- CHANGE THIS LINE
import resolvers from "./graphql/resolvers/index.js";

import { graphqlUploadExpress } from "graphql-upload"; // <-- Import this!

dotenv.config({});

const app = express();
const httpServer = http.createServer(app); // Create an HTTP server from your Express app

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })); // Adjust limits as needed

const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // csrfPrevention: false,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql", // This is the path for your GraphQL API
  express.json({ limit: "1mb" }),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      // You can pass shared context to your resolvers here
      // For example, authenticated user information, database connections, etc.
      // This 'context' object will be available as the third argument in your resolvers.
      return {
        // Example: user: req.user,
        // db: yourDatabaseConnection,
        // Add any other utilities or data needed by your resolvers
      };
    },
  })
);

// Start the combined server
httpServer.listen(PORT, () => {
  connectDB(); // Ensure this function connects your database
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint available at http://localhost:${PORT}/graphql`);
});
