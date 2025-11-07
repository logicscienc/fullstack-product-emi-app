import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiConnector = async (method, url, bodyData = {}, headers = {}, params = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData,
      headers,
      params,
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error?.response?.data || error);
    return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};

