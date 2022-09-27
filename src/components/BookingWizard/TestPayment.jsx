import React from "react";
import { functions } from "../../firebase/client";
import { httpsCallable } from "firebase/functions";

const TestPayment = () => {
  const fetchPaymentSecret = async () => {
    try {
      const createPaymentIntent = httpsCallable(
        functions,
        "createPaymentIntent"
      );
      const response = await createPaymentIntent({
        amount: 199,
        message: "test",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="btn btn-success" onClick={fetchPaymentSecret}>
      Test Payment
    </div>
  );
};

export default TestPayment;
