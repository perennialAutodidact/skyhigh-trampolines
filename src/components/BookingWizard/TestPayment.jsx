import React from "react";
import { functions } from "../../firebase/client";
import { httpsCallable } from "firebase/functions";

const TestPayment = () => {
  const fetchPaymentSecret = async () => {
    console.log(functions);
    try {
      const createPaymentIntent = httpsCallable(
        functions,
        "createPaymentIntent"
      );

      const response = await createPaymentIntent({
        amount: 199,
        metadata: { order_id: "1234" },
      });
      console.log(response);
    } catch (error) {
      console.log("CREATE PAYMENT ERROR", error);
    }
  };

  return (
    <div className="btn btn-success" onClick={fetchPaymentSecret}>
      Test Payment
    </div>
  );
};

export default TestPayment;
