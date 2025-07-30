import { useState } from "react";
import { useNavigate } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const FundingForm = ({ onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axiosSecure.post("/create-payment-intent", { amount: parseFloat(amount) });
    const clientSecret = data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) }
    });

    if (result.error) {
      setLoading(false);
      Swal.fire("Error", result.error.message, "error");
    } else if (result.paymentIntent.status === "succeeded") {
      await axiosSecure.post("/fundings", { amount: parseFloat(amount) });
      setLoading(false);
      setAmount("");
      onSuccess();
      Swal.fire("Success", "Thank you for your fund!", "success");
    }
  };


  if(loading) return <loading></loading>
  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl mx-auto bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-8">
      <h3 className="text-lg font-bold mb-4 text-[#E53935] text-center">Give Fund</h3>
      <input
        type="number"
        min="1"
        step="any"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
        placeholder="Enter amount (USD)"
        className="w-full bg-[#f5f5f5] rounded-lg py-4 px-4 text-[#530404] placeholder-gray-400 focus:outline-none"
      />
      <div className="w-full bg-[#f5f5f5] rounded-lg p-2 border border-[#ECAAA0]">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "18px",
                color: "#530404",
                backgroundColor: "#f5f5f5",
                '::placeholder': { color: "#bbb" },
                fontFamily: "inherit",
              },
              invalid: { color: "#E53935" }
            }
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-4 rounded-lg bg-[#E53935] text-white font-bold uppercase tracking-wider text-lg hover:bg-[#bb2b29] transition"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

const GiveFundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] flex items-center justify-center py-8">
      <Elements stripe={stripePromise}>
        <FundingForm onSuccess={() => navigate("/dashboard/funding")} />
      </Elements>
    </div>
  );
};

export default GiveFundPage;