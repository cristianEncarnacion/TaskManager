import axios from "./axios";
import { userProps } from "../types/user";

export const registerRequest = (user: userProps) =>
  axios.post(`/register`, user);

export const loginRequest = (user: userProps) => axios.post(`/login`, user);

export const verifyTokenRequest = (token: any) => axios.get(`/verify`);
