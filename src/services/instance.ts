import axios from "axios";
import { API_URI } from "./api_reference";

export  const instance  = axios.create({
  baseURL: API_URI,
  timeout: 1000,
});
