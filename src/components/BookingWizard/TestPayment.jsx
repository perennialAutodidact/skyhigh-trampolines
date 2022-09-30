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
        metadata: { 
          bookingDate: "2022-09-30",
          sessionTime: "9:00",
          headCount: 8,
          bookingName: "George Harrison",
          contactDetails: "01-1234-6789",
          confirmationNumber: null,
          status: "PENDING"
         },
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
