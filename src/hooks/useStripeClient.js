import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export const useStripeClient = () => {
  const [stripeClient, setStripeClient] = useState(null);
  const [loadingStripe, setLoadingStripe] = useState(false);

  useEffect(() => {
    if (!stripeClient) {
      setLoadingStripe(true);

      (async () => {
        try {
          const stripe = await loadStripe(
            process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
          );
          setStripeClient(stripe);
          console.log({stripekey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY})
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingStripe(false);

        }
      })();
    }
  }, [stripeClient]);

  return [stripeClient, loadingStripe];
};
