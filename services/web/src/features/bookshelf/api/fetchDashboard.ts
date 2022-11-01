import { axios } from "@utils/axios";

type Response = {
  bookStatusRatio: {
    unread: number;
    reading: number;
    read: number;
  };
  notFinishedReadingTotalPrice: number;
};
const fetchDashboard = async () => {
  return await axios.get<Response>("/dashboard");
};

export default fetchDashboard;
