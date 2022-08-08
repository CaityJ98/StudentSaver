function cors(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "https://studentsaver.netlify.app");
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
