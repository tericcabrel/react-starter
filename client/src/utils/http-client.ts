import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import LocalStorageManager from './local-storage-manager';
import { parseHTTPResponse } from './http-reponse-parser';

const instance: AxiosInstance = axios.create({
  baseURL : process.env.REACT_APP_API_BASE_URL
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use((request: AxiosRequestConfig): AxiosRequestConfig => {
  // You can customize the request here like encrypting data before it's sent to the server
  const token: string|null = LocalStorageManager.getUserAccessToken();

  if (token) {
    request.headers.common['x-access-token'] = token;
  }

  return request;
},                                (error: AxiosError): Promise<AxiosError> => {
  // console.log(error);
  return Promise.reject(error);
});

instance.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  // You can customize the response here like decrypting data coming from the server

  return response;
},                                 (error: any): Promise<string> => {
  // console.log(error);
  const errorString: string = parseHTTPResponse(error.response);

  return Promise.reject(errorString);
});

export default instance;
