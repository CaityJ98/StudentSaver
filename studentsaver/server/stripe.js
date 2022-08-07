const express = require("express");
const stripe = require("stripe")(
  "sk_test_51KUN7SFyUZ1tzSaV0yMQx3STYk1Ufya7oru0cdBmlZoLuQgqDJXHZD1eR92ULlXfHvfaYTnqNiBDh80QiJr37gRk00Qmwb1fAwL"
);
const { v4: uuidv4 } = require("uuid");
const stripeRouter = express.Router();

stripeRouter.post("/pay", (req, res, next) => {
  console.log(req.body.token);
  const { token, amount } = req.body;
  const idempotencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: amount,
          currency: "aud",
          customer: customer.id
        },
        { idempotencyKey }
      );
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = stripeRouter;
