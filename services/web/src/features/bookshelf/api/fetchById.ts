import { axios } from "@utils/axios";
import { BookDetail } from "../types";

export const fetchById = (id: number) => {
  return axios.get<BookDetail>(`/books/${id}`);
};
