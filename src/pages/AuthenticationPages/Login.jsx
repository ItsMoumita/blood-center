import Lottie from "lottie-react";
import { useContext } from "react";
import { BiEnvelope, BiKey } from "react-icons/bi";
import Title from "../../components/ExtraComponents/Title";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router";
import loginAnimation from "../../assets/loginAnimation.json";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;

    signIn(email, pass)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
          background: "white",
        });
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
          background: "white",
        });
      });
  };

  return (
    <div className="min-h-[92vh] bg-gradient-to-br from-[#FFE8E8] via-[#F5F5F5] to-[#FFF] dark:from-[#530404] dark:to-[#BB2B29] transition-colors duration-300">
      <div className="bg-gradient-to-br from-[#FFE8E8] via-[#F5F5F5] to-[#dbb5b5] dark:from-[#530404] dark:via-[#beadad] dark:to-[#BB2B29] transition-colors duration-300 min-h-[92vh] flex items-center">
        <div className="w-full md:w-11/12 mx-auto py-10 p-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            {/* Form: 2/3 on md+, full on mobile */}
            <div className="login-for w-full md:w-2/3 lg:w-1/2">
              <Title>Login Now</Title>
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-[#c5c0c0] p-5 md:py-16 flex flex-col gap-6 backdrop-blur-sm bg-opacity-80 shadow-lg rounded-lg"
              >
                <div className="flex justify-start items-center">
                  <div>
                    <BiEnvelope className="text-3xl text-[#BB2B29] dark:text-[#530404]" />
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-[#BB2B29] dark:focus:border-[#530404] text-[#530404] dark:text-[#BB2B29] placeholder:text-[#BB2B29] dark:placeholder:text-[#530404] transition-all duration-200"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-start items-center">
                    <div>
                      <BiKey className="text-3xl text-[#BB2B29] dark:text-[#530404]" />
                    </div>
                    <input
                      className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-[#BB2B29] dark:focus:border-[#530404] text-[#530404] dark:text-[#BB2B29] placeholder:text-[#BB2B29] dark:placeholder:text-[#530404] transition-all duration-200"
                      type="password"
                      name="pass"
                      placeholder="Enter password"
                    />
                  </div>
                  <p className="text-end text-[13px] text-[#BB2B29] dark:text-[#530404]">
                    forgot password?
                  </p>
                </div>

                <div className="p-1 flex gap-3 -mt-4 items-center">
                  <input type="checkbox" name="remember me" className="accent-[#BB2B29] dark:accent-[#530404]" />
                  <span className="text-[#530404] dark:text-[#BB2B29]">Remember Me</span>
                </div>

                <input
                  type="submit"
                  value="Login Now"
                  className="btn cursor-pointer bg-gradient-to-r from-[#BB2B29] to-[#ECAAA0] text-white dark:from-[#530404] dark:to-[#BB2B29] font-bold border-none"
                />
              </form>
            </div>
      
            {/* Animation: 1/3 on md+, hidden on mobile */}
            <div className="lottie w-full md:w-1/3 lg:w-1/2 mx-0 md:mx-20 hidden md:flex">
              <Lottie animationData={loginAnimation} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;