import _ from "lodash";
import axios, { AxiosRequestConfig } from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAdapter = new MockAdapter(axios, { delayResponse: 2000 });

const apiHost = "";

// axios
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: apiHost,
});

// middleware
const responseInterceptor = (response) => {
  const { data } = response;
  return data;
};
const responseErrorInterceptor = (error) => {
  if (error) {
    if (!error.response) {
      return console.error(error.message);
    }

    const { status, statusText } = error.response;
    console.error(`${status} ${statusText}`);
    return Promise.reject(error);
  }
};

api.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

type CallbackResponseSpecFunc = (config: AxiosRequestConfig) => any[] | Promise<any[]>;

type MockObject<T> = {
  type: "reply" | "timeout" | "timeoutOnce" | "networkError" | "networkErrorOnce";
  handle?: number | [number, T] | CallbackResponseSpecFunc;
};

interface IService<T = any> extends AxiosRequestConfig {
  mock?: MockObject<T> | number | [number, T];
  skipErrorHandler?: boolean;
}

// service
export default function ({ mock, skipErrorHandler = false, ...args }: IService) {
  const { method, url } = args;

  const mockMethod = _.camelCase(`on ${method}`);
  if (process.env.NODE_ENV === "development" && typeof mock !== "undefined") {
    if (!Array.isArray(mock) && mock instanceof Object) {
      const { type, handle } = mock;
      mockAdapter[mockMethod](url)[type](handle);
    } else if (Array.isArray(mock)) {
      mockAdapter[mockMethod](url).reply(...mock);
    } else {
      mockAdapter[mockMethod](url).reply(mock);
    }
  }
  return api.request({ ...args, skipErrorHandler });
}
