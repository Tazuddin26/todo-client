import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://todo-server-rho-bice.vercel.app",
});
const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;
