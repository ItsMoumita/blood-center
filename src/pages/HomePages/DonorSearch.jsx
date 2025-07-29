import { useEffect, useState } from "react";
import axios from "axios";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DonorSearch = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [form, setForm] = useState({ blood_group: "", district: "", upazila: "" });
  const [requests, setRequests] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    fetch("/districts.json")
      .then(res => res.json())
      .then(data => {
        const districtsData = data.find(item => item.name === "districts")?.data || [];
        setDistricts(districtsData);
      });
    fetch("/upazilas.json")
      .then(res => res.json())
      .then(data => {
        const upazilasData = data.find(item => item.name === "upazilas")?.data || [];
        setUpazilas(upazilasData);
      });
  }, []);

  useEffect(() => {
    setFilteredUpazilas(upazilas.filter(u => u.district_id === form.district));
  }, [form.district, upazilas]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === "district" ? { upazila: "" } : {}),
    }));
  };

  const handleSearch = async e => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (form.blood_group) params.append("blood_group", form.blood_group);
    if (form.district) params.append("district", districts.find(d => d.id === form.district)?.name || "");
    if (form.upazila) params.append("upazila", upazilas.find(u => u.id === form.upazila)?.name || "");
    const { data } = await axios.get(`https://blood-donation-server-umber-iota.vercel.app/search-donation-requests?${params.toString()}`);
    setRequests(data);
    setSearched(true);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] p-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold mb-8 text-center text-[#BB2B29] dark:text-[#FFE8E8]">Search Donation Requests</h2>
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <select
            name="blood_group"
            value={form.blood_group}
            onChange={handleChange}
            className="bg-[#f5f5f5] rounded-lg py-4 px-4 text-[#530404] focus:outline-none"
          >
            <option value="">Blood Group</option>
            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
          <select
            name="district"
            value={form.district}
            onChange={handleChange}
            className="bg-[#f5f5f5] rounded-lg py-4 px-4 text-[#530404] focus:outline-none"
          >
            <option value="">District</option>
            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <select
            name="upazila"
            value={form.upazila}
            onChange={handleChange}
            className="bg-[#f5f5f5] rounded-lg py-4 px-4 text-[#530404] focus:outline-none"
          >
            <option value="">Upazila</option>
            {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          <button
            type="submit"
            className="bg-[#E53935] text-white font-bold rounded-lg py-4 px-4 uppercase tracking-wider hover:bg-[#bb2b29] transition"
          >
            Search
          </button>
        </form>
        {searched && (
          <div>
            {requests.length === 0 ? (
              <div className="text-center text-[#BB2B29] font-semibold">No requests found.</div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {requests.map(req => (
                  <div key={req._id} className="bg-[#FFE8E8] dark:bg-[#1a2233] rounded-xl shadow p-4">
                    <div className="font-bold text-[#530404] dark:text-[#FFE8E8] text-lg">{req.recipientName}</div>
                    <div className="text-[#BB2B29] dark:text-[#ECAAA0] text-sm">{req.bloodGroup}</div>
                    <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">{req.recipientDistrict}, {req.recipientUpazila}</div>
                    <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">Date: {req.donationDate} Time: {req.donationTime}</div>
                    <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">Status: {req.donationStatus}</div>
                    <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">Message: {req.requestMessage}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorSearch;