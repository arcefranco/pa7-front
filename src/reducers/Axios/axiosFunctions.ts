import axios, { AxiosResponse, AxiosError } from "axios";
import getHeaderDB from "../../helpers/getHeaderDB";
import getHeaderToken from "../../helpers/getHeaderTokenAndDB";
import { ServiceErrorHandler } from "../../helpers/ServiceErrorHandler";

export const getFunction = async (route: string) => {
  try {
    const headers = getHeaderDB();
    const response: AxiosResponse = await axios.get(
      process.env.REACT_APP_HOST + route,
      headers
    );

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw Error(response.data);
    }
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error, route);
  }
};

export const postFunction = async (route: string, form: {}) => {
  try {
    const headers = getHeaderToken();
    const response: AxiosResponse = await axios.post(
      process.env.REACT_APP_HOST + route,
      form,
      headers
    );
    if (response.data.hasOwnProperty("status") && response.data.status) {
      return response.data;
    } else {
      throw Error(response.data.message ? response.data.message : "Error");
    }
  } catch (error) {
    return ServiceErrorHandler(error, route);
  }
};

export const updateFunction = async (route: string, form: {}) => {
  try {
    const headers = getHeaderToken();
    const response: AxiosResponse = await axios.put(
      process.env.REACT_APP_HOST + route,
      form,
      headers
    );
    if (response.data.hasOwnProperty("status") && response.data.status) {
      return response.data;
    } else {
      throw Error(response.data.message ? response.data.message : "Error");
    }
  } catch (error) {
    return ServiceErrorHandler(error, route);
  }
};

export const deleteFunction = async (route: string, id: EndUpdateParam) => {
  try {
    const response: AxiosResponse = await axios.delete(
      process.env.REACT_APP_HOST + route,
      {
        headers: {
          "x-auth-token": window.localStorage
            .getItem("userToken")
            ?.split(" ")[1] as string,
          "db-connection": window.localStorage.getItem("db") as string,
        },
        data: id,
      }
    );

    if (response.data.hasOwnProperty("status") && response.data.status) {
      return response.data;
    } else {
      throw Error(response.data.message ? response.data.message : "Error");
    }
  } catch (error) {
    return ServiceErrorHandler(error, route);
  }
};
