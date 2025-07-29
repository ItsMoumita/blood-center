import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { RiEdit2Fill } from "react-icons/ri";
import Loading from "../../components/ExtraComponents/Loading";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formState, setFormState] = useState({
    name: "",
    photo: "",
    district: "",
    upazila: "",
    blood_group: "",
  });

  useEffect(() => {
    if (!user) return;
    const fetchAll = async () => {
      const [profileRes, districtsRes, upazilasRes] = await Promise.all([
        axiosSecure.get("/user-profile"),
        fetch("/districts.json").then(res => res.json()),
        fetch("/upazilas.json").then(res => res.json()),
      ]);
      const loadedProfile = profileRes.data || null;
      const loadedDistricts = districtsRes.find((item) => item.name === "districts")?.data || [];
      const loadedUpazilas = upazilasRes.find((item) => item.name === "upazilas")?.data || [];
      setProfile(loadedProfile);
      setDistricts(loadedDistricts);
      setUpazilas(loadedUpazilas);

      // Set formState with ids for selects
      const districtObj = loadedDistricts.find(d => d.name === loadedProfile?.district);
      const upazilaObj = loadedUpazilas.find(u => u.name === loadedProfile?.upazila);
      setFormState({
        name: loadedProfile?.name || "",
        photo: loadedProfile?.photo || "",
        district: districtObj ? districtObj.id : "",
        upazila: upazilaObj ? upazilaObj.id : "",
        blood_group: loadedProfile?.blood_group || "",
      });
      setLoading(false);
    };
    fetchAll();
  }, [user]);

  useEffect(() => {
    setFilteredUpazilas(upazilas.filter((u) => u.district_id === formState.district));
  }, [formState.district, upazilas]);

  const handleEdit = () => setEditMode(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
      ...(name === "district" ? { upazila: "" } : {}),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updated = {
      name: formState.name,
      photo: formState.photo,
      district: districts.find(d => d.id === formState.district)?.name || "",
      upazila: upazilas.find(u => u.id === formState.upazila)?.name || "",
      blood_group: formState.blood_group,
    };
    await axiosSecure.patch(`/users/${profile._id}`, updated);
    setProfile({ ...profile, ...updated });
    setUser({ ...user, displayName: updated.name, photoURL: updated.photo });
    setEditMode(false);
    Swal.fire("Success", "Profile updated!", "success");
  };

  if (loading || !profile) return <Loading />;

  // For select values
  const districtId = editMode
    ? formState.district
    : districts.find(d => d.name === profile.district)?.id || "";
  const upazilaId = editMode
    ? formState.upazila
    : upazilas.find(u => u.name === profile.upazila)?.id || "";

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] flex items-center justify-center py-8">
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src={profile.photo || "/default-avatar.png"}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-[#BB2B29] dark:border-[#FFE8E8] shadow-lg object-cover"
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Profile</h2>
          {!editMode ? (
            <button
              type="button"
              className="text-[#BB2B29] font-bold px-4 py-4 rounded-full hover:bg-[#eeb5b5] transition"
              onClick={handleEdit}
              title="Edit"
            >
              <RiEdit2Fill className="text-2xl"/>
            </button>
          ) : null}
        </div>
        <form onSubmit={handleSave} className="space-y-5">
          <input
            name="name"
            value={editMode ? formState.name : profile.name}
            disabled={!editMode}
            onChange={editMode ? handleInputChange : undefined}
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Name"
          />
          <input
            name="email"
            value={profile.email}
            readOnly
            disabled
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Email"
          />
          <input
            name="photo"
            value={editMode ? formState.photo : profile.photo}
            disabled={!editMode}
            onChange={editMode ? handleInputChange : undefined}
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            placeholder="Avatar URL"
          />
          <div className="flex flex-col md:flex-row gap-4">
            <select
              name="district"
              disabled={!editMode}
              className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] focus:outline-none"
              value={districtId}
              onChange={editMode ? handleInputChange : undefined}
            >
              <option value="">Select District</option>
              {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <select
              name="upazila"
              disabled={!editMode}
              className="flex-1 bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] focus:outline-none"
              value={upazilaId}
              onChange={editMode ? handleInputChange : undefined}
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
          <select
            name="blood_group"
            disabled={!editMode}
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] focus:outline-none"
            value={editMode ? formState.blood_group : profile.blood_group}
            onChange={editMode ? handleInputChange : undefined}
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
          {editMode && (
            <button
              type="submit"
              className="btn bg-[#E53935] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#bb2b29] transition"
            >
              Save
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;