/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiClient } from "./config";

const LIMIT = 10;
// auth callAPIs
const loginRequest: any = (payload: Record<string, any>) =>
  ApiClient.post("/auth/login", payload);

const signUpRequest: any = (payload: Record<string, any>) =>
  ApiClient.post("/auth/register", payload);
const getUsersRequest: any = (payload: Record<string, any>) =>
  ApiClient.get(
    `admin/users?limit=${LIMIT}&keySearch=${
      payload.keySearch || ""
    }&pageIndex=${payload.pageIndex || null}`,
    payload,
  );
const getAdminPostRequest: any = (payload: Record<string, any>) =>
  ApiClient.get(
    `api/admin/posts?limit=${LIMIT}&keySearch=${
      payload.keySearch || ""
    }&pageIndex=${payload.pageIndex || null}&tagSearch=${
      payload.tagSearch || []
    }`,
    payload,
  );
const upLoadImgFile: any = (payload: Record<string, any>) =>
  ApiClient.post("api/file/upload", payload);
// crud admin
const creatPostAdmin: any = (payload: Record<string, any>) => {
  console.log("payload", payload);

  return ApiClient.post("api/admin/posts", payload);
};
const updatePostAdmin: any = (payload: Record<string, any>) =>
  ApiClient.put(`api/posts/${payload.id}`, payload.data);
const deletePostAdmin: any = (payload: Record<string, any>) =>
  ApiClient.delete(`api/posts/${payload}`, payload);

export {
  loginRequest,
  getUsersRequest,
  getAdminPostRequest,
  upLoadImgFile,
  creatPostAdmin,
  updatePostAdmin,
  deletePostAdmin,
  signUpRequest,
};
