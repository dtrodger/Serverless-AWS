import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { PageHeader } from "react-bootstrap";
import { Elements, StripeProvider } from "react-stripe-elements";
import { onError } from "../../libs/error";
import config from "../../config";
import BillingForm from "../../components/BillingForm";
import "./NewCharge.css";

export default function NewCharge() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    setStripe(window.Stripe(config.STRIPE_ACCESS_KEY));
  }, []);

  async function billUser(details) {
    return await API.post("notes", "/billing", {
      body: details
    });
  }

    async function handleFormSubmit(storage, { token, error }) {
      if (error) {
        onError(error);
        return;
      }

      setIsLoading(true);
      try {
        await billUser({
          storage,
          source: token.id
        });
        alert("Your card has been charged successfully!");
        history.push("/");
      } catch (e) {
        onError(e);
        setIsLoading(false);
      }
    }

    return (
      <div className="NewCharge">
      <PageHeader>New Charge</PageHeader>
        <StripeProvider stripe={stripe}>
          <Elements>
            <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
          </Elements>
        </StripeProvider>
      </div>
    );
}