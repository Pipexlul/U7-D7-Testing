const getFullRoute = (req) => {
  return `${req.method} ${req.baseUrl}${req.path}`;
};

export { getFullRoute };
