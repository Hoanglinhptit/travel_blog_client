import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { loginRequest } from "../../apis";
import fbIcon from "../../assets/login + signup icon/fb.svg";
import ggIcon from "../../assets/login + signup icon/gg.svg";
import { NavigateFunction, useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// import { ArrowLeftIcon } from "@chakra-ui/icons";

export const SignUp: React.FC = () => {
  const [account, setAccount] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const navigate: NavigateFunction = useNavigate();
  const handleLogin = async () => {
    const respone = await loginRequest(account);
    console.log("respone", respone.data.data);
    localStorage.setItem("auth_token", respone.data.data.token);
    localStorage.setItem("role", respone.data.data.role);
  };

  return (
    <>
      <div className="flex w-full justify-center lg:h-full  xl:h-screen  2xl:h-screen 3xl:h-screen items-center ">
        <div className="bg-[#fbbabd] sm:h-screen lg:w-full md:h-full lg:h-screen xl:w-[800px] 2xl:w-[800px] 3xl:w-[1000px] 3xl:my-auto rounded-lg shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="424"
            height="202"
            viewBox="0 0 424 232"
            fill="none"
          >
            <path
              d="M424 33C424 142.905 315.877 232 182.5 232C49.1232 232 -59 142.905 -59 33C-59 -76.9047 49.1232 -166 182.5 -166C315.877 -166 424 -76.9047 424 33Z"
              fill="#BD92E6"
            />
            <text x="0" y="100" fontSize={40} fill="white">
              CREATE AN ACCOUNT!
            </text>
          </svg>
          <div className="flex justify-center pt-8 flex-col">
            <Input
              placeholder="Your email"
              className="pl-5 h-14 w-5/6 rounded-2xl mx-auto mb-8 placeholder-black"
              onChange={(e) => {
                setAccount({
                  ...account,
                  email: e.target.value,
                });
              }}
            />
            <Input
              placeholder="Your password"
              className="pl-5 h-14 w-5/6 rounded-2xl mx-auto mb-8 placeholder-black"
              type="password"
              onChange={(e) => {
                setAccount({
                  ...account,
                  password: e.target.value,
                });
              }}
            />
            <Button
              className="h-12 w-4/6 mx-auto mb-6 rounded-2xl bg-[#BD92E6] text-[#fff] font-rubik font-bold hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
              onClick={handleLogin}
            >
              Sign in
            </Button>
            <div className="flex justify-center mb-6 ">
              <a href="/">
                <img
                  src={fbIcon}
                  alt="FaceBook Login"
                  className="w-10 h-10 mr-12"
                />
              </a>
              <a href="/">
                <img src={ggIcon} alt="Google Login" className="w-11 h-11" />
              </a>
            </div>

            <div className="flex justify-around my-8">
              <a className="text-[#fff] font-rubik text-2xl sm:text-lg hover:text-slate-800">
                Forget Password
              </a>
              <a className="text-[#fff] font-rubik text-2xl sm:text-lg hover:text-slate-800">
                Sign Up
              </a>
            </div>
            <Button
              className="h-12 w-3/6 mx-auto mb-6 rounded-2xl bg-[#BD92E6] text-[#fff] font-rubik font-bold hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
              onClick={() => navigate(-1)}
            >
              {/* <ArrowLeftIcon />{" "} */}
              <h1 className="ml-2 text-xl font-rubik">Back</h1>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
