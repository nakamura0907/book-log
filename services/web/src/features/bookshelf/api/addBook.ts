import { axios } from "@utils/axios";
import { BookDetail } from "../types";

export type AddBookDTO = {
  title: string;
  price: number;
  status: number;
  coverImage?: File;
};

export const addBook = (data: AddBookDTO) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("price", data.price.toString());
  formData.append("status", data.status.toString());
  if (data.coverImage) {
    formData.append("coverImage", data.coverImage);
  }

  return axios.post<BookDetail>("/books", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
