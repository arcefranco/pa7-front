import axios, { AxiosError } from "axios";
import { ResponseStatus } from "../types/Generales/ResponseStatus";

export const ServiceErrorHandler = (
  error: any | AxiosError,
  table?: string
): ResponseStatus => {
  if (axios.isAxiosError(error)) {
    console.log("axios error");
    throw { status: false, message: error.message + " " + table };
  } else if (error.hasOwnProperty("message")) {
    throw error;
  } else {
    return { status: false, message: JSON.stringify(error) + " " + table };
  }
};
