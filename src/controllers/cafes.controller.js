import InvalidRouteError from "../errors/InvalidRouteError.js";
import CafeModel from "../models/cafe/index.js";

const getCafes = (req, res, next) => {
  const cafes = CafeModel.getCafes();
  res.status(200).json(cafes);
};

const getCafe = (req, res, next) => {
  const { id } = req.params;

  const cafe = CafeModel.getCafe(id);

  if (cafe === null) {
    res.status(404).json({ message: `Cafe de id ${id} no encontrado` });
    return;
  }

  res.status(200).json(cafe);
};

const addCafe = (req, res, next) => {
  const { name } = req.body;

  const result = CafeModel.addCafe(name);
  if (result) {
    res.status(201).location(`/cafes/${result.id}`).json(result);
    return;
  }

  res.status(409).json({ message: "Ya existe un cafe con ese nombre" });
};

const modifyCafe = (req, res, next) => {
  const { id: payloadId, name } = req.body;
  const { id: paramId } = req.params;

  if (payloadId !== paramId) {
    res.status(400).json({
      message:
        "El id del parámetro no coincide con el id del cafe recibido en el payload",
    });
    return;
  }

  const result = CafeModel.modifyCafe({ id: paramId, name });
  if (result.valid) {
    res.status(200).json(result.modifiedObj);
    return;
  } else if (result.reason.notFound) {
    res.status(404).json({ message: "No se encontró ningún cafe con ese id" });
    return;
  } else if (result.reason.existingName) {
    res.status(409).json({ message: "Ya existe un cafe con ese nombre" });
    return;
  }

  next(
    new InvalidRouteError(
      `Se obtuvo un resultado inesperado al intentar modificar el cafe de id ${paramId}`,
      req
    )
  );
};

const deleteCafe = (req, res, next) => {
  const { id } = req.params;

  if (CafeModel.deleteCafe(id)) {
    res.status(204).end();
    return;
  }

  res.status(404).json({ message: "No se encontró ningún cafe con ese id" });
};

export { getCafes, getCafe, addCafe, modifyCafe, deleteCafe };
