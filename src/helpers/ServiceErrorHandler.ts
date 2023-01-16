import axios, { AxiosError } from "axios";
import { ResponseStatus } from "../types/Generales/ResponseStatus";

export const ServiceErrorHandler = (
  error: any | AxiosError
): ResponseStatus => {
  if (axios.isAxiosError(error)) {
    console.log("axios error");
    throw { status: false, message: error.message };
  } else if (error.hasOwnProperty("message")) {
    throw error;
  } else {
    return { status: false, message: JSON.stringify(error) };
  }
};
