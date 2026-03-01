export const sendResponse = (res, statusCode,contentType, payload) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", contentType);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.end(payload);
};
