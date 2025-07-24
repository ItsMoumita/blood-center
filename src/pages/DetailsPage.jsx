import axios from "axios";
import { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import StripeWrapper from "../components/StripeWrapper";
import { AuthContext } from "../providers/AuthProvider";

export default function DetailsPage() {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const book = useLoaderData();

  const handleRequest = () => {
    axios
      .patch(
        `http://localhost:5000/request/${book._id}`,
        { donationAmount },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        setIsOpen(false);
        console.log(res.data);
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Book Cover */}
        <div className="h-96">
          <img
            src={book.cover_image}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Book Info */}
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
          <p className="text-gray-600 text-lg">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="text-gray-600 text-lg">
            <span className="font-semibold">Genre:</span> {book.genre}
          </p>
          <p className="text-gray-600 text-lg">
            <span className="font-semibold">Pickup Location:</span>{" "}
            {book.location}
          </p>
          <p className="text-gray-600 text-lg">
            <span className="font-semibold">Available:</span> {book.quantity}{" "}
            copy{book.quantity > 1 ? "ies" : ""}
          </p>

          {/* Action Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 w-full bg-blue-600 text-white text-lg py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Request to Borrow
          </button>
        </div>
      </div>

      <dialog
        className="h-screen w-screen bg-black/30 fixed inset-0"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex items-center justify-center h-full">
          <div className="w-[350px] p-5 rounded-2xl bg-white">
            <label>Donation Amount: </label>
            <input
              onChange={(e) => setDonationAmount(e.target.value)}
              value={donationAmount}
              className="border p-2 w-full"
              type="number"
              min={1}
            />
            <div className="py-4">
              <StripeWrapper
                handleRequest={handleRequest}
                amount={donationAmount}
              />
            </div>
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-red-600 text-white p-2 "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
