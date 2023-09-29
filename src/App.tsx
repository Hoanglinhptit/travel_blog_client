import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { SignUp } from "./pages/Auth/SignUp";

import DashBoard from "./pages/Admin/Dashboard";
import CRUDposts from "./pages/CRUD posts";
import { PrivateRoute } from "./utils/ProtectedRoute";
// import { Footer } from "./layouts/footer";
import { Login } from "./pages/Auth/Login";

const App: React.FC = () => {
  return (
    <>
      <div>
        {/* <Header /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />

          <Route path="/admin" element={<PrivateRoute roles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<DashBoard />} />
          </Route>

          <Route path="/" element={<PrivateRoute roles={["admin", "user"]} />}>
            <Route path="/post" element={<CRUDposts />} />
          </Route>
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default App;
