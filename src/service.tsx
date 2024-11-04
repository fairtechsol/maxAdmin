import axios from "axios";
import { toast } from "react-toastify";
import { serviceUrl } from "./utils/Constants";

const toastOptions = {
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

const service = axios.create({
  baseURL: serviceUrl,
  headers: {
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    Pragma: "no-cache",
  },
});

service.defaults.timeout = 100000;

const cancelTokenSources: { [key: string]: any } = {};

service.interceptors.request.use(
  (config: any) => {
    const requestUrl = config.url;
    if (requestUrl && cancelTokenSources[requestUrl]) {
      cancelTokenSources[requestUrl].cancel(
        `Canceled previous request to ${requestUrl}`
      );
    }

    const source = axios.CancelToken.source();
    config.cancelToken = source.token;
    cancelTokenSources[requestUrl!] = source;

    config.headers["Content-Type"] = "application/json";

    const authToken = localStorage.getItem("jwtMaxAdmin");

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: any) => {
    const isGetRequest = response.config.method === "get";

    const requestUrl = response.config.url;

    if (requestUrl) {
      delete cancelTokenSources[requestUrl];
    }

    if (
      !isGetRequest &&
      response.data?.message &&
      !response.data?.message?.includes("User Balance")
    ) {
      toast.success(response.data.message, toastOptions);
    }
    return response.data;
  },
  (error: any) => {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
      return;
    }
    if (error.response.status === 500) {
      toast.error(error.response.data.message, toastOptions);
    } else if (error.response.status === 403) {
      toast.error(error.response.data.message, toastOptions);
    } else if (error.response.status === 404) {
      toast.error(error.response.data.message, toastOptions);
    } else if (error.response.status === 400) {
      toast.error(error.response.data.message, toastOptions);
    } else if (error.response.status === 409) {
      toast.error(error.response.data.message, toastOptions);
    } else if (error.response.status === 401) {
      // toast.error(error.response.data.message, toastOptions);
      window.location.replace("/admin/login");
      localStorage.clear();
    }

    return Promise.reject(error);
  }
);

export default service;
