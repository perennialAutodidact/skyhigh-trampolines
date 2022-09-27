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
        metadata: { order_id: "abcdefg" },
      });
      console.log(response.data);
    } catch (error) {
      console.log("CREATE PAYMENT ERROR", error);
    }
  };

  return (
    <div className="btn btn-success mt-3" onClick={fetchPaymentSecret}>
      Test Payment
    </div>
  );
};

export default TestPayment;
