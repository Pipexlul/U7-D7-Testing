const errorHandler = (err, req, res, next) => {
  let errMessage;

  if (err instanceof Error) {
    errMessage = err.message;
  } else {
    errMessage = `${err}`;
  }

  res.status(500).json({ message: errMessage });
};

export default errorHandler;
