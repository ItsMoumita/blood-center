import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
// import happy from "../../assets/happy.json";
import bloodPressure from "../../assets/bloodPressure.json"
import Title from "../../components/ExtraComponents/Title";
import { BiUser, BiImageAdd, BiEnvelope, BiKey,  } from "react-icons/bi";
import { MdOutlineBloodtype } from "react-icons/md";
import { ImLocation } from "react-icons/im";
import useAxiosPublic from "../../hooks/axiosPublic";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Register = () => {
  const goTo = useNavigate();
  const { createUser, setUser, updateUser } = useContext(AuthContext);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

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

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setFilteredUpazilas(upazilas.filter((u) => u.district_id === districtId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const pass = form.pass.value;
    const confirmPass = form.confirm_password.value;
    const bloodGroup = form.blood_group.value;
    const districtId = form.district.value;
    const upazilaId = form.upazila.value;
    const imageFile = form.image.files[0];

    if (pass !== confirmPass) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    const districtObj = districts.find((d) => d.id === districtId);
    const upazilaObj = upazilas.find((u) => u.id === upazilaId);

    let imageUrl = "";
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        imageUrl = data.data.url;
      } catch (err) {
        setError("Image upload failed!");
        setLoading(false);
        return;
      }
    }

    try {
      const res = await createUser(email, pass);
      await updateUser({ displayName: name, photoURL: imageUrl });
      setUser({ ...res.user, displayName: name, photoURL: imageUrl });

      const userData = {
        name,
        email,
        photo: imageUrl,
        blood_group: bloodGroup,
        district: districtObj?.name || "",
        upazila: upazilaObj?.name || "",
        role: "donor",
        status: "active",
      };
      await axiosPublic.post("/add-user", userData);

      goTo("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[92vh] bg-gradient-to-br from-[#FFE8E8] via-[#F5F5F5] to-[#FFF] dark:from-[#530404] dark:to-[#BB2B29] transition-colors duration-300">
      <div className="bg-gradient-to-br from-[#FFE8E8] via-[#F5F5F5] to-[#dbb5b5] dark:from-[#530404] dark:via-[#beadad] dark:to-[#BB2B29] transition-colors duration-300 min-h-[92vh] flex items-center">
        <div className="w-full md:w-11/12 mx-auto py-10 p-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            {/* Form: 2/3 on md+, full on mobile */}
            <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col md:flex-row gap-2">
              {/* Form */}
              <div className="w-full">
                <Title>Join with Us</Title>
                <form
                  onSubmit={handleSubmit}
                  className="bg-white dark:bg-[#c5c0c0] p-5 md:py-8 flex flex-col gap-6 backdrop-blur-sm bg-opacity-80 shadow-lg rounded-lg"
                >
                  {/* Name */}
                  <div className="flex justify-start items-center">
                    <BiUser className="text-3xl text-[#BB2B29] dark:text-[#530404] mr-2" />
                    <input
                      className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-[#BB2B29] dark:focus:border-[#530404] text-[#530404] dark:text-[#BB2B29] placeholder:text-[#BB2B29] dark:placeholder:text-[#530404] transition-all duration-200"
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  {/* Image */}
                  <div className="flex justify-start items-center">
                    <BiImageAdd className="text-3xl text-[#BB2B29] dark:text-[#530404] mr-2" />
                    <input
                      className="flex-1 p-2 border-b-2 bg-transparent focus:border-[#BB2B29] dark:focus:border-[#530404] text-[#530404] dark:text-[#BB2B29] transition-all duration-200"
                      type="file"
                      name="image"
                      accept="image/*"
                      required
                    />
                  </div>
                  {/* Email */}
                  <div className="flex justify-start items-center">
                    <BiEnvelope className="text-3xl text-[#BB2B29] dark:text-[#530404] mr-2" />
                    <input
                      className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-[#BB2B29] dark:focus:border-[#530404] text-[#530404] dark:text-[#BB2B29] placeholder:text-[#BB2B29] dark:placeholder:text-[#530404] transition-all duration-200"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  {/* Blood Group */}
                  <div className="flex justify-start items-center">
                    <MdOutlineBloodtype className="text-3xl text-[#BB2B29] dark:text-[#530404] mr-2" />
                    <select
                      name="blood_group"
                      className="flex-1 p-2 border-b-2 bg-transparent focus:border-[#BB2B29] dark:focus:border-[#530404] text-[#530404] dark:text-[#BB2B29] transition-all duration-200"
                      required
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                  {/* District */}
                  <div className="flex justify-start items-center">
                    <ImLocation  className="text-3xl text-[#BB2B29] dark:text-[#530404] mr-2"/>
                    <select
                      name="district"
                      className="flex-1 p-2 border-b-2 bg-transparent focus:border-[#BB2B29] dark:focus:border-[#530404] text-[#530404] dark:text-[#BB2B29] transition-all duration-200"
                      required
                      onChange={handleDistrictChange}
                      value={selectedDistrict}
                    >
                      <option value="">Select District</option>
                      {districts.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  {/* Upazila */}
                  <div className="flex justify-start items-center">
                     <ImLocation  className="text-3xl text-[#BB2B29] dark:text-[#530404] mr-2"/>
                    <select
                      name="upazila"
                      className="flex-1 p-2 border-b-2 bg-transparent focus:border-[#BB2B29] dark:focus:border-[#530404] text-[#530404] dark:text-[#BB2B29] transition-all duration-200"
                      required
                    >
                      <option value="">Select Upazila</option>
                      {filteredUpazilas.map((u) => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                      ))}
                    </select>
                  </div>
                  {/* Password */}
                  <div className="flex justify-start items-center">
                    <BiKey className="text-3xl text-[#BB2B29] dark:text-[#530404] mr-2" />
                    <input
                      className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-[#BB2B29] dark:focus:border-[#530404] text-[#530404] dark:text-[#BB2B29] placeholder:text-[#BB2B29] dark:placeholder:text-[#530404] transition-all duration-200"
                      type="password"
                      name="pass"
                      placeholder="Password"
                      required
                    />
                  </div>
                  {/* Confirm Password */}
                  <div className="flex justify-start items-center">
                    <BiKey className="text-3xl text-[#BB2B29] dark:text-[#530404] mr-2" />
                    <input
                      className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-[#BB2B29] dark:focus:border-[#530404] text-[#530404] dark:text-[#BB2B29] placeholder:text-[#BB2B29] dark:placeholder:text-[#530404] transition-all duration-200"
                      type="password"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                  {error && <div className="text-red-500">{error}</div>}
                  <input
                    type="submit"
                    value={loading ? "Registering..." : "Register Now"}
                    className="btn cursor-pointer bg-gradient-to-r from-[#BB2B29] to-[#ECAAA0] text-white dark:from-[#530404] dark:to-[#BB2B29] font-bold border-none"
                    disabled={loading}
                  />
                </form>
              </div>
            </div>
            {/* Animation: 1/3 on md+, hidden on mobile */}
            <div className="lottie w-full md:w-1/3 lg:w-1/2 mx-0 md:mx-2 hidden md:flex items-center justify-center">
              <Lottie animationData={bloodPressure} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;