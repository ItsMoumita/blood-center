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
  const {role} = useContext(AuthContext);
  useEffect(() => {
    axiosSecure.get(`/donation-requests/${id}`).then(res => {
      setRequest(res.data);
      setSelectedDistrict(res.data.recipientDistrict);
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
   
    if(role === 'donor')
    navigate("/dashboard/my-donation-requests");
   else if(role === 'admin')
    navigate("/dashboard/all-blood-donation-request")
  };

  if (!request) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Donation Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Recipient Name</label>
          <input name="recipientName" defaultValue={request.recipientName} required className="input input-bordered w-full" />
        </div>
        <div>
          <label>Recipient District</label>
          <select name="recipientDistrict" required className="input input-bordered w-full" value={selectedDistrict} onChange={handleDistrictChange}>
            <option value="">Select District</option>
            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label>Recipient Upazila</label>
          <select name="recipientUpazila" required className="input input-bordered w-full" defaultValue={request.recipientUpazila}>
            <option value="">Select Upazila</option>
            {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div>
          <label>Hospital Name</label>
          <input name="hospitalName" defaultValue={request.hospitalName} required className="input input-bordered w-full" />
        </div>
        <div>
          <label>Full Address Line</label>
          <input name="addressLine" defaultValue={request.addressLine} required className="input input-bordered w-full" />
        </div>
        <div>
          <label>Blood Group</label>
          <select name="bloodGroup" required className="input input-bordered w-full" defaultValue={request.bloodGroup}>
            <option value="">Select Blood Group</option>
            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
        </div>
        <div>
          <label>Donation Date</label>
          <input type="date" name="donationDate" defaultValue={request.donationDate} required className="input input-bordered w-full" />
        </div>
        <div>
          <label>Donation Time</label>
          <input type="time" name="donationTime" defaultValue={request.donationTime} required className="input input-bordered w-full" />
        </div>
        <div>
          <label>Request Message</label>
          <textarea name="requestMessage" defaultValue={request.requestMessage} required className="input input-bordered w-full" />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditDonationRequest;