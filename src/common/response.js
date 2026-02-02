
exports.sendSuccess = (res, message = "Success", data = null) => {
  return res.json({
    success: true,
    message: message,
    data: data
  });
};

exports.sendError = (res, message = "Something went wrong", status = 500) => {
  return res.status(status).json({
    success: false,
    message: message
  });
};


