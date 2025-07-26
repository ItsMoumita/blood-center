import Lottie from "lottie-react";
import { useContext } from "react";
import { BiEnvelope, BiImageAdd, BiKey, BiUser } from "react-icons/bi";
import { useNavigate } from "react-router";
import happy from "../assets/happy.json";
import Social from "../components/Social";
import Title from "../components/Title";
import { AuthContext } from "../providers/AuthProvider";

const Register = () => {
  const goTo = useNavigate();
  const { createUser, setUser, updateUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const email = form.email.value;
    const pass = form.pass.value;

    createUser(email, pass)
      .then((res) => {
        updateUser({ displayName: name }).then(() => {
          setUser({ ...res.user, displayName: name, photoURL: image });
          goTo("/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-[#FFE8E8] via-[#F5F5F5] to-[#FFF] dark:from-[#530404] dark:to-[#BB2B29] transition-colors duration-300">
      <div className="bg-gradient-to-br from-[#FFE8E8] via-[#F5F5F5] to-[#dbb5b5] dark:from-[#530404] dark:via-[#beadad] dark:to-[#BB2B29] transition-colors duration-300 min-h-[90vh] flex items-center">
        <div className="w-full md:w-11/12 mx-auto py-10 p-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            {/* Form: 2/3 on md+, full on mobile */}
            <div className="login-for w-full md:w-2/3 lg:w-1/2">
              <Title>Join with Us</Title>
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-[#c5c0c0] p-5 md:py-8 flex flex-col gap-6 backdrop-blur-sm bg-opacity-80 shadow-lg rounded-lg"
              >
                {/* Name */}
                <div className="flex justify-start items-center">
                  <div>
                    <BiUser className="text-3xl text-[#BB2B29] dark:text-[#530404]" />
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-[#BB2B29] dark:focus:border-[#530404] text-[#530404] dark:text-[#BB2B29] placeholder:text-[#BB2B29] dark:placeholder:text-[#530404] transition-all duration-200"
                    type="text"
                    name="name"
                    placeholder="Enter Full Name"
                  />
                </div>
                {/* Image URL */}
                <div className="flex justify-start items-center">
                  <div>
                    <BiImageAdd className="text-3xl text-[#BB2B29] dark:text-[#530404]" />
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-[#BB2B29] dark:focus:border-[#530404] text-[#530404] dark:text-[#BB2B29] placeholder:text-[#BB2B29] dark:placeholder:text-[#530404] transition-all duration-200"
                    type="text"
                    name="image"
                    placeholder="Enter Image Url"
                  />
                </div>
                {/* Email */}
                <div className="flex justify-start items-center">
                  <div>
                    <BiEnvelope className="text-3xl text-[#BB2B29] dark:text-[#530404]" />
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-[#BB2B29] dark:focus:border-[#530404] text-[#530404] dark:text-[#BB2B29] placeholder:text-[#BB2B29] dark:placeholder:text-[#530404] transition-all duration-200"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                  />
                </div>
                {/* Password */}
                <div className="flex justify-start items-center">
                  <div>
                    <BiKey className="text-3xl text-[#BB2B29] dark:text-[#530404]" />
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-[#BB2B29] dark:focus:border-[#530404] text-[#530404] dark:text-[#BB2B29] placeholder:text-[#BB2B29] dark:placeholder:text-[#530404] transition-all duration-200"
                    type="password"
                    name="pass"
                    placeholder="Enter Password"
                  />
                </div>
                {/* Register Button */}
                <input
                  type="submit"
                  value="Register Now"
                  className="btn cursor-pointer bg-gradient-to-r from-[#BB2B29] to-[#ECAAA0] text-white dark:from-[#530404] dark:to-[#BB2B29] font-bold border-none"
                />
              </form>
            </div>
            <Social />
            {/* Animation: 1/3 on md+, hidden on mobile */}
            <div className="lottie w-full md:w-1/3 lg:w-1/2 mx-0 lg:mx-6 hidden md:flex">
              <Lottie animationData={happy} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;