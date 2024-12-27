const handleError = (error, req, res, next) => {
  res.status(error.statusCode ?? 500).json({
    success: false,
    message: error.message ?? "Error en el servidor",
  });
};

export default handleError;
