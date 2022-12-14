import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../redux/actions/orderActions";
import Loader from "./Loader";
import Error from "./Error";
import Success from "./Success";

export default function Checkout({ amount }) {
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { loading, success, error } = orderstate;
  const dispatch = useDispatch();

  const tokenHandler = (token) => {
    console.log(token);
    dispatch(placeOrder(token, amount));
  };

  const validate = () => {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {success && <Success success="Your order has been placed successfully" />}
      {error && <Error error="Could not process your order" />}
      <StripeCheckout
        token={tokenHandler}
        amount={amount * 100}
        shippingAddress
        billingAddress
        currency="USD"
        stripeKey="pk_test_51L0btjD7y6aHzyHtwMocItRoGRKatOhgAYiks6xMvq76uQxPbPqYHL4YLZtb2MeYgyo8GxJsC6pff19sDZhPkevo00b1GGQmVk"
      >
        <button onClick={validate} className="btn btn-secondary text-light">
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  );
}
