import express from "express";
import cors from "cors";
import { verifyAuthJWT } from "./src/middleware/auth/middleware.js";
import { logger } from "./src/middleware/logging/middleware.js";
import { handleError } from "./src/middleware/err/middleware.js";
import { middlewareAllowedMethod } from "./src/middleware/middleware.js";
import response from "./src/config/response/responseSucces.js";

// Import rute-rute
import createData from "./src/routes/create_db/route.js";
import getData from "./src/routes/read_db/route.js";
import AI from "./src/routes/gemini-ai/route.js";
import createJWT from "./src/routes/jwt/route.js";

// Inisialisasi aplikasi Express
export const app = express();

// Gunakan middleware CORS
app.use(cors());

// Handler untuk rute indeks
app.get("/", (req, res) => {
   return response(200, [], "Hello from api", false, res);
});

// Middleware umum
app.use(express.json());
app.use(logger);
app.use(handleError);

// Rute-rute yang tidak memerlukan autentikasi dan khusus method get
const getMethod = (req, res, next) => {
   const methodAllowed = req.method;
   if (methodAllowed == "GET") {
      next();
   } else {
      return res.status(405).json({
         status: 405,
         message: "Method not Allowed",
      });
   }
};
app.use("/read/", getMethod, getData);
app.use("/v1/create/", middlewareAllowedMethod, createJWT);

// Rute-rute yang memerlukan autentikasi
app.use("/v2/data/", middlewareAllowedMethod, verifyAuthJWT, createData);
app.use("/v2/ai/", middlewareAllowedMethod, verifyAuthJWT, AI);

// Middleware untuk menangani 404 Not Found
app.use((req, res, next) => {
   res.status(404).json({
      status: 404,
      message: "Not Found",
   });
});

export default app;
