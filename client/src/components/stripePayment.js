import React from "react";
import Stripe from "react-stripe-checkout";
import axios from "axios";

const StripeCheckout = () => {
  const handleToken = (totalAmount, token) => {
    try {
      axios.post("http://localhost:5000/auth/stripe/pay", {
        token: token.id,
        amount: totalAmount
      });
    } catch (error) {
      console.log(error);
    };
  }
  const tokenHandler = (token) => {
      handleToken(100, token);
  }

  return (
      <div>

          <Stripe
            stripeKey="pk_test_51KUN7SFyUZ1tzSaVKgqfom1U90R54GgveP4cGG98lUPosAjX8dHonUK0KVj7kYq6FfiKD3P2pPsmyv9FE0NuvJzV00lSJ4VbtS"
            token={tokenHandler}
            />
      </div>

  );
}
export default StripeCheckout;
