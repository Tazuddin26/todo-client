import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://todo-server-1-pmap.onrender.com",
});
const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;
