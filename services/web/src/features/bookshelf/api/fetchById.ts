import { axios } from "@utils/axios";

export const fetchById = (id: number) => {
    return axios.get(`/books/${id}`);
};