import { axios } from "@utils/axios";
import { AxiosResponse } from "axios";
import { BookDetail } from "../types";

export const fetchById = (
  id: number
): Promise<AxiosResponse<BookDetail, any>> => {
  return axios.get(`/books/${id}`);
};
