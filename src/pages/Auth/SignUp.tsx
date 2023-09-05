import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  // Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  HStack,
  Link,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
// import { loginRequest } from "../../apis";
// import { NavigateFunction, useNavigate } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import Cat from "../../assets/travel_cat.svg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { SiLinkedin, SiMessenger } from "react-icons/si";

export const SignUp: React.FC = () => {
  const [name, setName] = React.useState<{
    lastName: string;
    firstName: string;
  }>({
    lastName: "",
    firstName: "",
  });
  const [account, setAccount] = React.useState<{
    email: string;
    password: string;
    name: string;
  }>({
    email: "",
    password: "",
    name: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);

  // const navigate: NavigateFunction = useNavigate();
  const handleSignUp = async () => {
    console.log("payload", account);

    // const respone = await loginRequest(account);
    // localStorage.setItem("auth_token", respone.data.data.token);
    // localStorage.setItem("role", respone.data.data.role);
    // navigate(-1);
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
          <Flex alignItems={"center"}>
            <Heading fontSize={"4xl"} color={"pink.400"}>
              Travelling
            </Heading>
            <Image src={Cat} />
          </Flex>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"pink.400"}>
            to enjoy all of our cool features ✌️
          </Text>
          {/* <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Text color={"pink.400"}>features</Text> ✌️
          </Text> */}
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setName({
                        ...name,
                        firstName: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setName({
                        ...name,
                        lastName: e.target.value,
                      });
                      setAccount({
                        ...account,
                        name: name.firstName.concat(name.lastName),
                      });
                    }}
                  />
                </FormControl>
              </Box>
            </HStack>
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
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setAccount({
                      ...account,
                      password: e.target.value,
                    });
                  }}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"pink.400"}
                color={"white"}
                _hover={{
                  bg: "pink.500",
                }}
                onClick={handleSignUp}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} href="/auth/login">
                  Login
                </Link>
              </Text>
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
                  <Text>Sign up with Google</Text>
                </Center>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
