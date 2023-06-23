const validateBodyName = (req, res, next) => {
  const { name } = req.body;

  if (name === undefined) {
    res.status(400).json({ message: "El nombre del cafe es requerido" });
    return;
  }

  if (!name) {
    res
      .status(400)
      .json({ message: "El nombre del cafe es no puede estar vacio" });
    return;
  }

  next();
};

export default { validateBodyName };
