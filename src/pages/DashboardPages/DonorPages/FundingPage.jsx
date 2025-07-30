import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import Loading from "../../../components/ExtraComponents/Loading";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const FundingForm = ({ onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // 1. Create payment intent
    const { data } = await axiosSecure.post("/create-payment-intent", { amount: parseFloat(amount) });
    const clientSecret = data.clientSecret;

    // 2. Confirm card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) }
    });

    if (result.error) {
      setLoading(false);
      alert(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      // 3. Save funding to DB
      await axiosSecure.post("/fundings", { amount: parseFloat(amount) });
      Swal.fire("Success", "Donation Successful!", "success");
      setLoading(false);
      setAmount("");
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
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
      <div className="bg-[#f5f5f5] w-3xl rounded-lg p-4">
        <CardElement options={{ style: { base: { fontSize: "18px" } } }} />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-4 rounded-lg bg-[#E53935] text-white font-bold uppercase tracking-wider text-lg hover:bg-[#bb2b29] transition"
      >
        {loading ? "Processing..." : "Give Fund"}
      </button>
    </form>
  );
};

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [fundings, setFundings] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
  const limit = 10;

  const fetchFundings = () => {
    setLoading(true);
    axiosSecure.get(`/fundings?page=${page}&limit=${limit}`).then(res => {
      setFundings(res.data.fundings);
      setTotal(res.data.total);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchFundings();
    // eslint-disable-next-line
  }, [page]);

  if(loading) return <Loading></Loading>
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] p-4">
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-bold text-[#FFE8E8] mb-6 text-center">Funding</h2>
        <div className="flex justify-center mb-8">
          <Elements stripe={stripePromise}>
            <FundingForm onSuccess={fetchFundings} />
          </Elements>
        </div>
        <div className="bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-4">
          <h3 className="text-lg font-bold mb-4 text-[#BB2B29] dark:text-[#FFE8E8]">All Funds</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-[#FFE8E8]">
                <th className="py-3 px-4 text-left text-[#BB2B29] font-semibold">Name</th>
                <th className="py-3 px-4 text-left text-[#BB2B29] font-semibold">Email</th>
                <th className="py-3 px-4 text-left text-[#BB2B29] font-semibold">Amount</th>
                <th className="py-3 px-4 text-left text-[#BB2B29] font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {fundings.map(fund => (
                <tr key={fund._id} className="border-b border-b-[#FFE8E8]">
                  <td className="py-3 px-4">{fund.name}</td>
                  <td className="py-3 px-4">{fund.email}</td>
                  <td className="py-3 px-4">${fund.amount.toFixed(2)}</td>
                  <td className="py-3 px-4">{new Date(fund.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
              <button
                key={i}
                className={`btn btn-xs rounded-xl font-bold border-none ${
                  page === i + 1
                    ? "bg-white/70 text-[#BB2B29] dark:bg-[#FFE8E8] dark:text-[#530404]"
                    : "bg-[#ECAAA0] text-[#530404] dark:bg-[#BB2B29] dark:text-[#FFE8E8]"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingPage;