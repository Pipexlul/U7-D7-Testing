import CafeModel from "../models/cafe/index.js";

const resetDatabase = (req, res, next) => {
  CafeModel.resetDatabase();

  res.status(204).end();
};

export { resetDatabase };
