import { axios } from "@utils/axios";

export type AddBookDTO = {
    title: string;
    status: number;
    coverImage?: File;
};

export const addBook = (data: AddBookDTO) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.coverImage) {
        formData.append("coverImage", data.coverImage);
    }
    
    return axios.post("/books", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
