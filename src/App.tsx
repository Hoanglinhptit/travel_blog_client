import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Auth/Login";
import { SignUp } from "./pages/Auth/SignUp";
import Post from "./pages/Admin/Posts";
import Users from "./pages/Admin/Users";
import CRUDposts from "./pages/CRUD posts";
import { PrivateRoute } from "./utils/ProtectedRoute";

const App: React.FC = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route
            path="/admin/posts"
            element={
              <PrivateRoute roles={["admin"]}>
                {" "}
                <Post />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute roles={["admin"]}>
                {" "}
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/post"
            element={
              <PrivateRoute roles={["admin", "user"]}>
                {" "}
                <CRUDposts />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
