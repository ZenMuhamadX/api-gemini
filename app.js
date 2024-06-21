// express
import express from "express";
export const app = express();

// inisialisasi middleware
import { logger } from "./src/middleware/logging/middleware.js";
import { middleware } from "./src/middleware/midleware.js";
import { crossOriginResourceSharing } from "./src/middleware/cors/middleware.js";
import { handleError } from "./src/middleware/err/middleware.js";

// route
import createData from "./src/routes/create_db/route.js";
import index from "./src/routes/index.js";
import getData from "./src/routes/read_db/route.js";

app.use(express.json());
app.use(middleware);
app.use(logger);
app.use(crossOriginResourceSharing);
app.use(handleError);

// rouote
app.use("/", index);
app.use("/", getData);
app.use("/", createData);
