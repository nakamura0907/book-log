import { axios } from "@utils/axios";

const fetchDashboard = async () => {
  return await axios.get("/dashboard");
};

export default fetchDashboard;
