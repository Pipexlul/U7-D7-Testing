import express from "express";
import cors from "cors";

import cafeRoutes from "./routes/cafes.js";
import developerRoutes from "./routes/developer.js";

import notFoundHandler from "./middleware/routeNotFoundHandler.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/cafes", cafeRoutes);
if (process.env.NODE_ENV === "test") {
  app.use("/dev", developerRoutes);
}

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
