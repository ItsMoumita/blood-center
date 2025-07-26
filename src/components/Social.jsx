import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const Social = () => {
  const { googleSignIn } = useContext(AuthContext);
   const [loading, setLoading] = useState(false);
   const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleSignIn();
       Swal.fire({
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
          background: "white", // use a valid color
        });
      navigate(location.state?.from?.pathname || "/");
      setLoading(false);
    } catch (error) {
       Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          background: "white",
        });
      setLoading(false);
    }
  }

  if(loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }
  return (
    <div className=" bg-white dark:bg-[#c5c0c0] shadow md:py-14 rounded-full flex gap-3 md:flex-col items-center md:mt-16">
      <div>
        <img
        // onClick={googleSignIn}
        onClick={handleGoogleLogin}
          className="w-[54px]"
          src="https://img.icons8.com/?size=96&id=17949&format=png"
          alt=""
        />
      </div>
      <div className="">
        <img
          className="w-[54px]"
          src="https://img.icons8.com/?size=96&id=118497&format=png"
          alt=""
        />
      </div>
      <div className="">
        <img
          className="w-[54px]"
          src="https://img.icons8.com/?size=96&id=bUGbDbW2XLqs&format=png"
          alt=""
        />
      </div>
      <div className="">
        <img
          className="w-[54px]"
          src="https://img.icons8.com/?size=128&id=3tC9EQumUAuq&format=png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Social;
