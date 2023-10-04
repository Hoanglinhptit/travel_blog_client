/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiClient } from "./config";

const LIMIT = 10;
// auth callAPIs
const loginRequest: any = (payload: Record<string, any>) =>
  ApiClient.post("/auth/login", payload);

const signUpRequest: any = (payload: Record<string, any>) =>
  ApiClient.post("/auth/register", payload);
// user crud admin api
const getUsersRequest: any = (payload: Record<string, any>) =>
  ApiClient.get(
    `admin/users?limit=${LIMIT}&keySearch=${
      payload.keySearch || ""
    }&pageIndex=${payload.pageIndex || null}`,
    payload,
  );
const updateUserAdmin: any = (payload: Record<string, any>) => {
  console.log("payload", payload);

  return ApiClient.put(`admin/users/${payload.id}`, payload.data);
};

const deleteUserAdmin: any = (payload: Record<string, any>) =>
  ApiClient.delete(`admin/users/${payload}`, payload);
// post api
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
  return ApiClient.post("api/admin/posts", payload);
};
const updatePostAdmin: any = (payload: Record<string, any>) =>
  ApiClient.put(`api/posts/${payload.id}`, payload.data);
const deletePostAdmin: any = (payload: Record<string, any>) =>
  ApiClient.delete(`api/posts/${payload}`, payload);

// tags
const getAdminTagsRequest: any = (payload: Record<string, any>) =>
  ApiClient.get(
    `api/tags?limit=${LIMIT}&keySearch=${payload.keySearch || ""}&pageIndex=${
      payload.pageIndex || null
    }`,
    payload,
  );
const creatTagAdmin: any = (payload: Record<string, any>) => {
  return ApiClient.post("/api/tags", payload);
};
const updateTagAdmin: any = (payload: Record<string, any>) =>
  ApiClient.put(`api/tags/${payload.id}`, payload.data);
const deleteTagAdmin: any = (payload: Record<string, any>) =>
  ApiClient.delete(`api/tags/${payload}`, payload);

// categories
const getAdminCategoriesRequest: any = (payload: Record<string, any>) =>
  ApiClient.get(
    `/api/categories?limit=${LIMIT}&keySearch=${
      payload.keySearch || ""
    }&pageIndex=${payload.pageIndex || null}`,
    payload,
  );
const creatCategoryAdmin: any = (payload: Record<string, any>) => {
  return ApiClient.post("/api/categories", payload);
};
const updateCategoryAdmin: any = (payload: Record<string, any>) =>
  ApiClient.put(`/api/categories/${payload.id}`, payload.data);
const deleteCategoryAdmin: any = (payload: Record<string, any>) =>
  ApiClient.delete(`/api/categories/${payload}`, payload);

export {
  loginRequest,
  getUsersRequest,
  getAdminPostRequest,
  upLoadImgFile,
  creatPostAdmin,
  updatePostAdmin,
  deletePostAdmin,
  signUpRequest,
  updateUserAdmin,
  deleteUserAdmin,
  deleteCategoryAdmin,
  updateCategoryAdmin,
  creatCategoryAdmin,
  getAdminCategoriesRequest,
  getAdminTagsRequest,
  creatTagAdmin,
  updateTagAdmin,
  deleteTagAdmin,
};
