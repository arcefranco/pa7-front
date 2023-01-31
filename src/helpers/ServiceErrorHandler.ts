import axios, { AxiosError } from "axios";
import { ResponseStatus } from "../types/Generales/ResponseStatus";

export const ServiceErrorHandler = (
  error: any | AxiosError,
  table?: string
): ResponseStatus => {
  if (axios.isAxiosError(error) || error.hasOwnProperty("message")) {
    return { status: false, message: error.message + " " + "(" + table + ")" };
  } else if (error.hasOwnProperty("name")) {
    return { status: false, message: error.name + " " + "(" + table + ")" };
  } else {
    return {
      status: false,
      message: JSON.stringify(error) + " " + "(" + table + ")",
    };
  }
};
