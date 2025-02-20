import axios from "axios";
const axiosPublic = axios.create({
  baseURL: "https://task-flow-server-silk.vercel.app",
});
const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;
