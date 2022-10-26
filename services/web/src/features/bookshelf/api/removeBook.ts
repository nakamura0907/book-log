import { axios } from "@utils/axios";

const removeBook = async (bookId: number) => {
  await axios.delete(`/books/${bookId}`);
};

export default removeBook;
