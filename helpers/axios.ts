import { serverURL } from "@/constants/statics";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${serverURL}/api/v1`,
  withCredentials: true,
});
