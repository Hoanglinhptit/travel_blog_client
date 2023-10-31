import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { loginRequest } from "../../apis";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import Cat from "../../assets/travel_cat.svg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
// import { SiLinkedin, SiMessenger } from "react-icons/si";

export const Login: React.FC = () => {
  const [account, setAccount] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const navigate: NavigateFunction = useNavigate();
  const handleLogin = async () => {
    const respone = await loginRequest(account);
    console.log("response", respone);
    localStorage.setItem("auth_token", respone.data.data.access_token);
    localStorage.setItem("role", respone.data.data.role);
    localStorage.setItem("name", respone.data.data.name);

    respone.data.data.role === "admin"
      ? navigate("/admin/posts")
      : navigate(-1);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      //   border={"2px"}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        border={"1px"}
        borderColor={"pink.400"}
        borderRadius={"2xl"}
        boxShadow={"lg"}
      >
        <Stack align={"center"}>
          <Flex alignItems={"center"} as={"a"} href="/">
            <Heading fontSize={"4xl"} color={"pink.400"}>
              Travelling
            </Heading>
            <Image src={Cat} />
          </Flex>
          <Heading fontSize={"4xl"} alignContent={"center"}>
            Sign in to your account
          </Heading>
          {/* <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Text color={"pink.400"}>features</Text> ✌️
          </Text> */}
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => {
                  setAccount({
                    ...account,
                    email: e.target.value,
                  });
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setAccount({
                    ...account,
                    password: e.target.value,
                  });
                }}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"pink.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"pink.400"}
                color={"white"}
                _hover={{
                  bg: "pink.500",
                }}
                onClick={handleLogin}
              >
                Sign in
              </Button>
            </Stack>
            <Stack spacing={2} align={"center"} maxW={"md"} w={"full"}>
              {/* Facebook */}
              <Button
                w={"full"}
                colorScheme={"facebook"}
                leftIcon={<FaFacebook />}
              >
                <Center>
                  <Text>Continue with Facebook</Text>
                </Center>
              </Button>

              {/* Google */}
              <Button w={"full"} variant={"outline"} leftIcon={<FcGoogle />}>
                <Center>
                  <Text>Sign in with Google</Text>
                </Center>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
