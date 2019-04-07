import axios, { AxiosResponse } from "axios";

const JSONPlaceholderURL = "https://jsonplaceholder.typicode.com";

export const getPhotos = async (parameters: string = ""): Promise<Api.Photo[]> => {
  const url = `${JSONPlaceholderURL}/photos/${parameters}`;
  const response: AxiosResponse<Api.Photo[]> = await axios.get(url);
  console.log("response", response);
  return response.data;
};

export const getUsers = async (parameters: string = ""): Promise<Api.User[]> => {
  const url = `${JSONPlaceholderURL}/users/${parameters}`;
  const response: AxiosResponse<Api.User[]> = await axios.get(url);
  console.log("response", response);
  return response.data;
};

export const getAlbums = async (parameters: string = ""): Promise<Api.Album[]> => {
  const url = `${JSONPlaceholderURL}/albums/${parameters}`;
  const response: AxiosResponse<Api.Album[]> = await axios.get(url);
  console.log("response", response);
  return response.data;
};