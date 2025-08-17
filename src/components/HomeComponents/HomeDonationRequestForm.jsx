import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const HomeDonationRequestForm = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        const districtsData = data.find((item) => item.name === "districts")?.data || [];
        setDistricts(districtsData);
      });

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        const upazilasData = data.find((item) => item.name === "upazilas")?.data || [];
        setUpazilas(upazilasData);
      });
  }, []);

  useEffect(() => {
    setFilteredUpazilas(upazilas.filter((u) => u.district_id === selectedDistrict));
  }, [selectedDistrict, upazilas]);

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const data = {
      requesterName: form.requesterName.value,
      requesterEmail: form.requesterEmail.value,
      recipientName: form.recipientName.value,
      recipientDistrict: districts.find(d => d.id === form.recipientDistrict.value)?.name || "",
      recipientUpazila: upazilas.find(u => u.id === form.recipientUpazila.value)?.name || "",
      hospitalName: form.hospitalName.value,
      addressLine: form.addressLine.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
    };
    await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/public-donation-request`, data);
    setLoading(false);
    Swal.fire("Success", "Donation request created!", "success");
    form.reset();
    setSelectedDistrict("");
    setFilteredUpazilas([]);
  };

  return (
    <section className="bg-[#FFE8E8]/20 dark:bg-[#0F172A] py-16">
        <h2 className="text-2xl md:text-4xl text-center font-bold mb-8 text-[#BB2B29] dark:text-[#FFE8E8]">Create Donation Request</h2>

        <div className="max-w-10/12 mx-auto bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-8 my-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1: Name, Email, Recipient Name */}
        <div className="flex flex-col lg:flex-row gap-4">
          <input
            name="requesterName"
            required
            className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Your Name"
          />
          <input
            name="requesterEmail"
            type="email"
            required
            className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Your Email"
          />
          <input
            name="recipientName"
            required
            className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Recipient Name"
          />
        </div>
        {/* Row 2: District, Upazila */}
        <div className="flex flex-col md:flex-row gap-4">
          <select
            name="recipientDistrict"
            required
            className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] focus:outline-none"
            onChange={handleDistrictChange}
            value={selectedDistrict}
          >
            <option value="">Select District</option>
            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <select
            name="recipientUpazila"
            required
            className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] focus:outline-none"
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        {/* Row 3: Hospital Name, Full Address */}
        <div className="flex flex-col lg:flex-row gap-4">
          <input
            name="hospitalName"
            required
            className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Hospital Name"
          />
          <input
            name="addressLine"
            required
            className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Full Address Line"
          />
        </div>
        {/* Row 4: Blood Group, Date, Time */}
        <div className="flex flex-col lg:flex-row gap-4">
          <select
            name="bloodGroup"
            required
            className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] focus:outline-none"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
          <input
            type="date"
            name="donationDate"
            required
            className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] focus:outline-none"
            placeholder="Donation Date"
          />
          <input
            type="time"
            name="donationTime"
            required
            className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] focus:outline-none"
            placeholder="Donation Time"
          />
        </div>
        {/* Row 5: Request Message */}
        <div>
          <textarea
            name="requestMessage"
            required
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Request Message"
          />
        </div>
        {/* Row 6: Button */}
        <div className="w-2/5 mx-auto">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-lg bg-[#E53935] dark:bg-[#530404] text-white font-bold uppercase tracking-wider text-lg hover:bg-[#bb2b29e1]  transition"
          >
            {loading ? "Submitting..." : "Request"}
          </button>
        </div>
      </form>
    </div>
    </section>
  );
};

export default HomeDonationRequestForm;