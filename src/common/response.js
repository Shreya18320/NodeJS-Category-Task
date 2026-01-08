// // Success response
// exports.sendSuccess = (res, message, data = null) => {
//   res.status(200).json({
//     success: true,
//     message: message,
//     data: data
//   });
// };

// // Error response
// exports.sendError = (res, message = "Something went wrong", status = 500) => {
//   res.status(status).json({
//     success: false,
//     message: message
//   });
// };



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


