// ** Third Party Imports
import express, { type Application } from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan"; // A popular HTTP request logger middleware for node.js
import {
  configureCloudinary,
  errorHandler,
  NotFoundError,
  verifyGatewayToken,
} from "@fvoid/shared-lib";

// ** Local Imports
import { config } from "@/config";
import healthRouter from "@/routes/health.router";
import userRouter from "@/routes/user.router";
import jobRouter from "@/routes/job.router";
import companyRouter from "@/routes/company.router";
import applicationRouter from "@/routes/application.router";
// import loginRegisterRouter from "@src/routes/login-register.route";
// import verficationRouter from "@src/routes/verification.route";
// import passwordRouter from "@src/routes/password.route";
// import identityRouter from "@src/routes/identity.route";
// import healthRouter from "@src/routes/health.routes";
// import seedRouter from "@src/routes/seed.route";
// import { mqWrapper } from "@src/rabbitmq-wrapper";

// ** Define Auth Service

class AuthService {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start() {
    this.load_configurations();
    this.set_standard_middlewares();
    this.set_security_middlewares();
    this.set_route_middlewares();
    this.set_error_middlewares();
    this.start_server();
  }

  private load_configurations() {
    configureCloudinary({
      cloud_name: config.CLOUD_NAME,
      api_key: config.CLOUD_API_KEY,
      api_secret: config.CLOUD_API_SECRET,
    });
  }

  private set_standard_middlewares() {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ limit: "50mb", extended: true })); // For URL-encoded bodies
  }

  private set_security_middlewares() {
    this.app.use(
      cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      })
    );

    this.app.use(verifyGatewayToken(config.GATEWAY_JWT_TOKEN, "auth"));
  }

  private set_route_middlewares() {
    this.app.use(morgan("dev"));
    const BASE_PATH = "/api/v1";
    this.app.use(healthRouter);
    this.app.use(BASE_PATH, userRouter);
    this.app.use(BASE_PATH, jobRouter);
    this.app.use(BASE_PATH, companyRouter);
    this.app.use(BASE_PATH, applicationRouter);
  }

  private set_error_middlewares() {
    this.app.use("*", function (req, res, next) {
      next(new NotFoundError());
    });

    this.app.use(errorHandler);
  }

  private start_server() {
    const PORT = 4001;
    this.app.listen(PORT, () => {
      console.log(`Auth server is running on port ${PORT}`);
    });
  }
}

// ** Create & Start Application

const app = express();

const server = new AuthService(app);

server.start();
