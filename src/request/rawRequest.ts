import axios from "axios";
import { checkFakeToken } from "./checkFakeToken";

export const baseUrl: string = "http://3.124.28.166:8080//api";

const makeRAWRequest = (
  endpoint: string,
  method: string,
  body?: any
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: baseUrl + endpoint,
      headers: {
        Authorization: localStorage.getItem("authToken") ?? "nullToken",
      },
      data: body,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        checkFakeToken(error);
        reject(error);
      });
  });
};

export const makeGETRequest = async (endpoint: string): Promise<any> => {
  const response: Promise<any> = await makeRAWRequest(endpoint, "GET");
  return response;
};

export const makePOSTRequest = async (
  endpoint: string,
  body?: any
): Promise<any> => {
  const response: Promise<any> = makeRAWRequest(endpoint, "POST", body);
  return response;
};

export const makePATCHRequest = async (
  endpoint: string,
  body?: any
): Promise<any> => {
  const response: Promise<any> = makeRAWRequest(endpoint, "PATCH", body);
  return response;
};

export const makePUTRequest = async (endpoint: string): Promise<any> => {
  const response: Promise<any> = makeRAWRequest(endpoint, "PUT");
  return response;
};

export const makeDELETERequest = async (endpoint: string): Promise<any> => {
  const response: Promise<any> = makeRAWRequest(endpoint, "DELETE");
  return response;
};
