// import axios from "axios";
// import { useContext, useEffect } from "react";
// import { AuthContext } from "../providers/AuthProvider";

// const useAxiosSecure = () => {
//   const { user } = useContext(AuthContext);
//   console.log("🚀 ~ useAxiosSecure ~ accessToken:", user.accessToken);
//   const instance = axios.create({
//     baseURL: "http://localhost:5000",
//     headers: {
//       Authorization: `Bearer ${user.accessToken}`,
//     },
//   });


//   useEffect(() => {
//   }, [])
  

//   return instance;
// };

// export default useAxiosSecure;


import axios from "axios";
import { useContext, useMemo } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  const instance = useMemo(() => {
    // If user or user.accessToken is not available, return a basic axios instance
    if (!user || !user.accessToken) {
      return axios.create({
        baseURL: "http://localhost:5000",
      });
    }
    // If user and accessToken exist, return axios instance with Authorization header
    return axios.create({
      baseURL: "http://localhost:5000",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
  }, [user]);

  return instance;
};

export default useAxiosSecure;