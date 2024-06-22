// express
import express from "express";
export const app = express();

// inisialisasi middleware
import cors from "cors";
import { verifyAuthJWT } from "./src/middleware/auth/middleware.js";
import { logger } from "./src/middleware/logging/middleware.js";
import { middleware } from "./src/middleware/middleware.js";
import { handleError } from "./src/middleware/err/middleware.js";

// route
import createData from "./src/routes/create_db/route.js";
import getData from "./src/routes/read_db/route.js";
import AI from "./src/routes/gemini-ai/route.js";
import createJWT from "./src/routes/jwt/route.js";
import response from "./src/config/response/responseSucces.js";
// cors
app.use(cors());

// index route
app.get("/", (req, res) => {
   return response(200, [], "Hello from api", false, res);
});

// Middleware
app.use(express.json());
app.use(logger);
app.use(middleware);
app.use(handleError);

// Authentication (if applicable to most routes)
app.use("/v1/createJWT", createJWT);
app.use("/", getData);
app.use(verifyAuthJWT);

// Routes
app.use("/v1/ai", AI);
app.use("/v1", createData);
