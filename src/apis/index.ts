/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiClient } from "./config";

// const LIMIT = 10;
// auth callAPIs
const loginRequest = (payload: Record<string, any>) =>
  ApiClient.post("/auth/login", payload);

export { loginRequest };
