const router = require("express").Router();
const authController = require("./controllers/authController");
const listingsController = require("./controllers/listingsController");
const userController = require("./controllers/userController");
const stripeRouter = require("./stripe.js");

router.get("/", (req, res) => {
  res.json("Server is running");
});

router.use("/auth", authController);
router.use("/listings", listingsController);
router.use("/user", userController);
router.use("/auth/stripe", stripeRouter);

module.exports = router;
