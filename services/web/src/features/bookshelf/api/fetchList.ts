import { axios } from "@utils/axios";

export type FetchListDTO = {
  skip?: number;
  query?: string;
  status?: number;
  order?: string;
};

export const fetchList = (data: FetchListDTO) => {
  return axios.get("/books", {
    params: data,
  });
};
