import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { SignUp } from "./pages/Auth/SignUp";
import AdminPost from "./pages/Admin/Posts";
import AdminUser from "./pages/Admin/Users";
import AdminTags from "./pages/Admin/Tags";
import AdminCategories from "./pages/Admin/Categories";
import CRUDposts from "./pages/CRUD posts";
import { PrivateRoute } from "./utils/ProtectedRoute";
import { Login } from "./pages/Auth/Login";
import { Header } from "./layouts/header";
import { Footer } from "./layouts/footer";

const App: React.FC = () => {
  const [cond, setCond] = useState<boolean>(
    window.location.pathname === "/" || window.location.pathname === "/post",
  );
  const location = useLocation();
  useEffect(() => {
    const cond = location.pathname === "/" || location.pathname === "/post";
    cond ? setCond(true) : setCond(false);
  }, [location]);
  return (
    <>
      <div>
        {cond && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />

          <Route path="/admin" element={<PrivateRoute roles={["admin"]} />}>
            <Route path="/admin/posts" element={<AdminPost />} />
          </Route>
          <Route path="/admin" element={<PrivateRoute roles={["admin"]} />}>
            <Route path="/admin/users" element={<AdminUser />} />
          </Route>
          <Route path="/admin" element={<PrivateRoute roles={["admin"]} />}>
            <Route path="/admin/tags" element={<AdminTags />} />
          </Route>
          <Route path="/admin" element={<PrivateRoute roles={["admin"]} />}>
            <Route path="/admin/categories" element={<AdminCategories />} />
          </Route>
          <Route path="/" element={<PrivateRoute roles={["admin", "user"]} />}>
            <Route path="/post" element={<CRUDposts />} />
          </Route>
        </Routes>
      </div>
      {cond && <Footer />}
    </>
  );
};

export default App;
