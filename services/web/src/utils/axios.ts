import Axiox, { AxiosError, AxiosResponse } from "axios";

type ErrorMessage = {
    message: string;
};
export type FetchErrorResponse = AxiosResponse<ErrorMessage>;

export const axios = Axiox.create({
    baseURL: "http://localhost:3001/api/v1",
});

export const isAxiosError = (error: any): error is AxiosError<ErrorMessage, any> => {
    return Axiox.isAxiosError(error);
}