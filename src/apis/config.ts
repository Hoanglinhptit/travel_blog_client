/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import queryString from "query-string";
import * as config from "../helpers/config";

const createAxios = (): AxiosInstance => {
  const axiosInstant = axios.create();
  axiosInstant.defaults.baseURL = config.apiv1;
  axiosInstant.defaults.timeout = 2000;
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  axiosInstant.interceptors.request.use(
    async (axiosConfig: InternalAxiosRequestConfig) => {
      axiosConfig.headers.Authorization = `Bearer ${localStorage
        .getItem("token")
        ?.toString()}`;
      return axiosConfig;
    },
    (error: any): Promise<never> => Promise.reject(error),
  );

  axiosInstant.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error?.response?.status === 401) {
        // store.dispatch(logoutAction());
        localStorage.removeItem("auth_token");
        localStorage.removeItem("role");
        window.location.reload();
      }
      return Promise.reject(error);
    },
  );

  return axiosInstant;
};

export const axiosClient = createAxios();

const downloadXLSXFile = async (url: string, fileName: string) => {
  const headers = { "Content-Type": "blob" };
  const config: AxiosRequestConfig = {
    method: "GET",
    url,
    responseType: "arraybuffer",
    headers,
  };

  try {
    const response = await axios(config);
    const outputFilename = `${Date.now()}_${fileName}.xls`;
    const url = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", outputFilename);
    document.body.appendChild(link);
    link.click();

    // OR you can save/write file locally.
    // fs.writeFileSync(outputFilename, response.data);
  } catch (error) {
    console.error(error);
  }
};

// handle url
function handleUrl(url: string, query: Record<string, any>) {
  return queryString.stringifyUrl({ url, query });
}

export const ApiClient = {
  get: (url: string, payload: Record<string, any>) =>
    axiosClient.get(handleUrl(url, payload)),
  post: (url: string, payload: Record<string, any>) =>
    axiosClient.post(url, payload),
  put: (url: string, payload: Record<string, any>) =>
    axiosClient.put(url, payload),
  patch: (url: string, payload: Record<string, any>) =>
    axiosClient.patch(handleUrl(url, payload)),
  delete: (url: string, payload: Record<string, any>) =>
    axiosClient.delete(handleUrl(url, payload)),
  downloadXLSXFile,
};
