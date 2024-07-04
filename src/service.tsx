import axios from "axios";
import { toast } from "react-toastify";
import { Constants } from "./utils/Constants";

const toastOptions = {
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

// use below baseUrl for live build

const service = axios.create({
  //PROD
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${Constants.apiBasePath}`
      : `${Constants.localPath}`,
});

// use below service for live build

// const service = axios.create({
//   baseURL:
//     process.env.NODE_ENV === "production"
//       ? `${Constants.apiBasePathLive}`
//       : `${Constants.localPath}`,
// });

service.defaults.timeout = 100000;

service.interceptors.request.use(
  (config: any) => {
    config.headers["Content-Type"] = "application/json";

    const authToken = localStorage.getItem("jwtMaxAdmin");
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: any) => {
    const isGetRequest = response.config.method === "get";

    if (!isGetRequest && response.data?.message && !response.data?.message?.includes('User Balance')) {
      toast.success(response.data.message, toastOptions);
    }
    return response.data;
  },
  (error: any) => {
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
