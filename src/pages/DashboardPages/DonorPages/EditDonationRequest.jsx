import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EditDonationRequest = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  useEffect(() => {
    axiosSecure.get(`/donation-requests/${id}`).then(res => {
      setRequest(res.data);
      // Find district id by name for select value
      const districtObj = res.data.recipientDistrict
        ? districts.find(d => d.name === res.data.recipientDistrict)
        : null;
      setSelectedDistrict(districtObj ? districtObj.id : "");
    });
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
  }, [id]);

  useEffect(() => {
    setFilteredUpazilas(upazilas.filter((u) => u.district_id === selectedDistrict));
  }, [selectedDistrict, upazilas]);

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const update = {
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
    await axiosSecure.patch(`/donation-requests/${id}`, update);
    Swal.fire("Success", "Donation request updated!", "success");
    if (role === 'donor')
      navigate("/dashboard/my-donation-requests");
    else if (role === 'admin')
      navigate("/dashboard/all-blood-donation-request");
  };

  if (!request) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] text-white">
      <div className="text-xl">Loading...</div>
    </div>
  );

  // Find district id by name for select value
  const districtObj = districts.find(d => d.name === request.recipientDistrict);
  const districtId = districtObj ? districtObj.id : "";

  // Find upazila id by name for select value
  const upazilaObj = upazilas.find(u => u.name === request.recipientUpazila);
  const upazilaId = upazilaObj ? upazilaObj.id : "";

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] flex items-center justify-center py-8">
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-8 text-center text-[#BB2B29] dark:text-[#FFE8E8]">Edit Donation Request</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="recipientName"
            defaultValue={request.recipientName}
            required
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Recipient Name"
          />
          {/* District and Upazila side by side on large, stacked on small */}
          <div className="flex flex-col md:flex-row gap-4">
            <select
              name="recipientDistrict"
              required
              className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] focus:outline-none"
              value={selectedDistrict || districtId}
              onChange={handleDistrictChange}
            >
              <option value="">Select District</option>
              {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <select
              name="recipientUpazila"
              required
              className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] focus:outline-none"
              value={upazilaId}
              onChange={() => {}} // prevent React warning, but upazila is set by select value
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
          <input
            name="hospitalName"
            defaultValue={request.hospitalName}
            required
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Hospital Name"
          />
          <input
            name="addressLine"
            defaultValue={request.addressLine}
            required
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Full Address Line"
          />
          <select
            name="bloodGroup"
            required
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] focus:outline-none"
            defaultValue={request.bloodGroup}
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
          {/* Donation Date and Time side by side on large, stacked on small */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="date"
              name="donationDate"
              defaultValue={request.donationDate}
              required
              className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] focus:outline-none"
              placeholder="Donation Date"
            />
            <input
              type="time"
              name="donationTime"
              defaultValue={request.donationTime}
              required
              className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] focus:outline-none"
              placeholder="Donation Time"
            />
          </div>
          <textarea
            name="requestMessage"
            defaultValue={request.requestMessage}
            required
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Request Message"
          />
          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-[#E53935] text-white font-bold uppercase tracking-wider text-lg hover:bg-[#bb2b29] transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDonationRequest;