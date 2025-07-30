import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import Loading from "../../../components/ExtraComponents/Loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
      Swal.fire("Success", "Donation Successful!", "success");
      setLoading(false);
      setAmount("");
      onSuccess();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-lg mx-auto bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-6"
      style={{ minWidth: 0 }}
    >
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

  // Skeletons for loading
  const skeletonCards = Array.from({ length: 3 }).map((_, idx) => (
    <div key={idx} className="bg-[#FFE8E8] dark:bg-[#273a57] rounded-xl shadow p-4 animate-pulse">
      <Skeleton height={24} width={120} className="mb-2" />
      <Skeleton height={16} width={180} className="mb-2" />
      <Skeleton height={16} width={80} className="mb-2" />
      <Skeleton height={16} width={100} className="mb-2" />
    </div>
  ));

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] p-4">
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-bold text-[#FFE8E8] mb-6 text-center">Funding</h2>
        <div className="flex justify-center mb-8">
          <Elements stripe={stripePromise}>
            <FundingForm onSuccess={fetchFundings} />
          </Elements>
        </div>
        {/* Card view for mobile, table for md+ */}
        <div className="block md:hidden">
          <div className="grid grid-cols-1 gap-6">
            {loading
              ? skeletonCards
              : fundings.map((fund, idx) => (
                <div
                  key={fund._id}
                  className="bg-[#FFE8E8] dark:bg-[#273a57] rounded-xl shadow p-4 flex flex-col gap-2 animate-fadeIn"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="font-bold text-[#530404] dark:text-[#FFE8E8] text-lg">{fund.name}</div>
                  <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">{fund.email}</div>
                  <div className="text-[#BB2B29] dark:text-[#ECAAA0] text-sm">${fund.amount.toFixed(2)}</div>
                  <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">Date: {new Date(fund.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
          </div>
        </div>
        {/* Table view for md+ */}
        <div className="hidden md:block">
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
                {loading
                  ? Array.from({ length: 3 }).map((_, idx) => (
                    <tr key={idx}>
                      <td colSpan={4}><Skeleton height={40} /></td>
                    </tr>
                  ))
                  : fundings.map(fund => (
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
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in;
          }
        `}
      </style>
    </div>
  );
};

export default FundingPage;