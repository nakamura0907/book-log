import { axios } from "@utils/axios";
import { BookDetail } from "../types";

export type EditBookDTO = {
  title?: string;
  price?: number;
  status?: number;
  file?: File;
  score?: number;
  comment?: string;
};

export const editBook = async (id: number, data: EditBookDTO) => {
  const formData = new FormData();
  if (data.title) {
    formData.append("title", data.title);
  }
  if (data.price) {
    formData.append("price", data.price.toString());
  }
  if (data.status !== undefined) {
    formData.append("status", data.status.toString());
  }
  if (data.file) {
    formData.append("coverImage", data.file);
  }
  if (data.score !== undefined) {
    formData.append("score", data.score.toString());
  }
  if (data.comment !== undefined) {
    formData.append("comment", data.comment);
  }

  return axios.put<BookDetail>(`/books/${id}`, formData);
};
