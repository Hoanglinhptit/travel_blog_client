import { Flex, Heading, Image, useBreakpointValue } from "@chakra-ui/react";
import Cat from "../assets/travel_cat.svg";

export const Logo: React.FC = () => {
  return (
    <>
      <Flex
        alignItems={"center"}
        // flexWrap={"wrap"}
        width={useBreakpointValue({ base: "200px", md: "150px" })}
        justifyContent={"center"}
      >
        <Heading
          fontSize={useBreakpointValue({ base: "3xl", md: "2xl" })}
          color={"pink.400"}
        >
          Travelling
        </Heading>
        <Image
          src={Cat}
          width={useBreakpointValue({ base: "60px", md: "40px" })}
        />
      </Flex>
    </>
  );
};
