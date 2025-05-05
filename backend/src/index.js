import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { dbConnect } from "./prismaClient.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import serverConfig from "./config.js";
import routes from "./routes/index.routes.js";
import { swaggerOptions } from "./config/swaggerOptions.js";

// Initializing App
const app = express();
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Database Connection
dbConnect();

// Cors Setup
app.use(cors({ origin: serverConfig.corsOrigin, credentials: true }));

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// API Routes
app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handler Middleware
app.use(errorHandler);

app.listen(serverConfig.serverPort, () => {
  console.log(
    `Server listening on http://localhost:${serverConfig.serverPort}`
  );
});
