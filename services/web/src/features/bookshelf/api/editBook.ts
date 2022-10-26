import { axios } from "@utils/axios";
import { AxiosResponse } from "axios";
import { BookDetail } from "../types";

export type EditBookDTO = {
  title?: string;
  price?: number;
  status?: number;
  file?: File;
  score?: number;
  comment?: string;
};

export const editBook = async (
  id: number,
  data: EditBookDTO
): Promise<AxiosResponse<BookDetail, any>> => {
  const formData = new FormData();
  if (data.title) {
    formData.append("title", data.title);
  }
  if (data.price) {
    formData.append("price", data.price.toString());
  }
  if (data.status) {
    formData.append("status", data.status.toString());
  }
  if (data.file) {
    formData.append("coverImage", data.file);
  }
  if (data.score) {
    formData.append("score", data.score.toString());
  }
  if (data.comment) {
    formData.append("comment", data.comment);
  }

  return axios.put(`/books/${id}`, formData);
};
