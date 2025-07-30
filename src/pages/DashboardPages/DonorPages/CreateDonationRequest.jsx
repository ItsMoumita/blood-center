import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "../../../components/ExtraComponents/Loading";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const CreateDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [status, setStatus] = useState("active");
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

       setLoading(true)
    axiosSecure.get("/get-user-role").then(res => setStatus(res.data.status));
    setLoading(false);
  }, []);

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setFilteredUpazilas(upazilas.filter((u) => u.district_id === districtId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status !== "active") {
      Swal.fire("Blocked", "You are blocked and cannot create requests.", "error");
      return;
    }
    const form = e.target;
    const data = {
      requesterName: user.displayName,
      requesterEmail: user.email,
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
    await axiosSecure.post("/donation-requests", data);
    Swal.fire("Success", "Donation request created!", "success");
    navigate("/dashboard/my-donation-requests");
  };

  if(loading) return <Loading></Loading>
  return (
    <div className="min-h-screen w-full bg-gradient-to-b p-4 from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] flex items-center justify-center py-8">
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-8 text-center text-[#BB2B29] dark:text-[#FFE8E8]">Create Donation Request</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Requester Name"
          />
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Requester Email"
          />
          <input
            name="recipientName"
            required
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Recipient Name"
          />
   
          <div className="flex flex-row gap-4">
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
          <input
            name="hospitalName"
            required
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Hospital Name"
          />
          <input
            name="addressLine"
            required
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Full Address Line"
          />
          <select
            name="bloodGroup"
            required
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] focus:outline-none"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
          <div className="flex flex-row gap-4">
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
          <textarea
            name="requestMessage"
            required
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Request Message"
          />
          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-[#E53935] dark:bg-[#530404] text-white font-bold uppercase tracking-wider text-lg hover:bg-[#bb2b29e1]  transition"
          >
            Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;