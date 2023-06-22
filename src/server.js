import express from "express";
import cors from "cors";

import cafeRoutes from "./routes/cafes.js";

import notFoundHandler from "./middleware/routeNotFoundHandler.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/cafes", cafeRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
