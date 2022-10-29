import { axios } from "@utils/axios";
import { BookDetail } from "../types";

export type FetchListDTO = {
  skip?: number;
  query?: string;
  status?: number;
  order?: string;
};

type Response = {
  books: BookDetail[];
  isEnd: boolean;
};

export const fetchList = (data: FetchListDTO) => {
  return axios.get<Response>("/books", {
    params: data,
  });
};
