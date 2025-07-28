// src/pages/DashboardPages/CreateDonationRequest.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const CreateDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [status, setStatus] = useState("active"); // Assume active by default

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

    // Optionally, fetch user status from backend
    axiosSecure.get("/get-user-role").then(res => setStatus(res.data.status));
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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create Donation Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label>Requester Name</label>
          <input type="text" value={user.displayName} readOnly className="input input-bordered w-full" />
        </div>
        <div>
          <label>Requester Email</label>
          <input type="email" value={user.email} readOnly className="input input-bordered w-full" />
        </div>
        <div>
          <label>Recipient Name</label>
          <input name="recipientName" required className="input input-bordered w-full" />
        </div>
        <div>
          <label>Recipient District</label>
          <select name="recipientDistrict" required className="input input-bordered w-full" onChange={handleDistrictChange}>
            <option value="">Select District</option>
            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label>Recipient Upazila</label>
          <select name="recipientUpazila" required className="input input-bordered w-full">
            <option value="">Select Upazila</option>
            {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div>
          <label>Hospital Name</label>
          <input name="hospitalName" required className="input input-bordered w-full" />
        </div>
        <div>
          <label>Full Address Line</label>
          <input name="addressLine" required className="input input-bordered w-full" />
        </div>
        <div>
          <label>Blood Group</label>
          <select name="bloodGroup" required className="input input-bordered w-full">
            <option value="">Select Blood Group</option>
            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
        </div>
        <div>
          <label>Donation Date</label>
          <input type="date" name="donationDate" required className="input input-bordered w-full" />
        </div>
        <div>
          <label>Donation Time</label>
          <input type="time" name="donationTime" required className="input input-bordered w-full" />
        </div>
        <div>
          <label>Request Message</label>
          <textarea name="requestMessage" required className="input input-bordered w-full" />
        </div>
        <button type="submit" className="btn btn-primary">Request</button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;