import axios, { AxiosError, type AxiosInstance ,type InternalAxiosRequestConfig }  from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7000/api/v1"

// Injector Pattern

// 1. Define a function that will hold our token-fetching logic.
//    It's initialized to null because we can't get the token logic yet.
let getAccessToken: (() => Promise<string>) | null = null;

// 2. Create an exported function that React components can call to "inject"
//    the real token-fetching function (getAccessTokenSilently from Auth0).
export const setupAuthInterceptor = (tokenGetter: () => Promise<string>) => {
  getAccessToken = tokenGetter;
};

const axiosInstance: AxiosInstance = axios.create({
    baseURL : API_URL,
    timeout: 10000,
    headers: {
    "Content-Type": "application/json",
  },
})


// Request interceptor
axiosInstance.interceptors.request.use(
 async (config: InternalAxiosRequestConfig) => {
  if(getAccessToken){
    try {
      const token = await getAccessToken();
      if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    } catch (error) {
      console.error("Failed to get access token for request:", error);
    }
  }
    

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;