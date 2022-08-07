function cors(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    GET,
    HEAD,
    POST,
    PUT,
    PATCH,
    DELETE,
    OPTIONS
  );
  // req.setHeader('Origin', 'host')
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
}

module.exports = cors;
