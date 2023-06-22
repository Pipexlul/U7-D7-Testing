import InvalidRouteError from "../../errors/InvalidRouteError.js";
import { isInteger } from "../../utils/formatHelper.js";

const validateParamId = (req, res, next) => {
  const { id } = req.params;

  let numId;

  if (id === undefined) {
    res
      .status(400)
      .json({ message: "El id del cafe en los parametros es requerido" });
    return;
  }

  if (typeof id === "string") {
    if (!isInteger(id)) {
      res.status(400).json({
        message: "El id del parametro debe ser un entero positivo o zero",
      });
      return;
    } else {
      numId = parseInt(id);
    }
  } else {
    numId = parseInt(id);
  }

  if (isNaN(numId) || numId.toString() !== id) {
    next(
      new InvalidRouteError(
        "No se pudo obtener un id valido en los parametros",
        req
      )
    );
  }

  req.params.id = numId;
  next();
};

const validateBodyId = (req, res, next) => {
  const { id } = req.body;

  let numId;

  if (id === undefined) {
    res
      .status(400)
      .json({ message: "El id del cafe en el payload es requerido" });
    return;
  }

  if (typeof id === "string") {
    if (!isInteger(id)) {
      res.status(400).json({
        message: "El id en el payload debe ser un entero positivo o zero",
      });
      return;
    } else {
      numId = parseInt(id);
    }
  } else {
    numId = parseInt(id);
  }

  if (isNaN(numId)) {
    next(
      new InvalidRouteError(
        "No se pudo obtener un id valido en el payload",
        req
      )
    );
  }

  req.body.id = numId;
  next();
};

export default { validateParamId, validateBodyId };
