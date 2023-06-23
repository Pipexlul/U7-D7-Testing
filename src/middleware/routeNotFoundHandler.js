const notFoundHandler = (req, res, next) => {
  const message = `Route ${req.baseUrl}${req.path} was not found!`;

  res.status(404).json({ message });
};

export default notFoundHandler;
