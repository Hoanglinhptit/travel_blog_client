import {
  VStack,
  Container,
  useBreakpointValue,
  Stack,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import CaptionCarousel from "../../layouts/carousels";
export const Home: React.FC = () => {
  const containerMaxW = useBreakpointValue({
    // base: "container.sm",
    md: "container.sm",
    xl: "container.lg",
    "2xl": "container.xl",
  });
  return (
    <>
      <VStack marginTop="10">
        <Container
          maxW={containerMaxW}
          bg="green.400"
          color="#262626"
          centerContent
          padding={0}
        >
          <CaptionCarousel />
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Stack>
              <CardBody>
                <Heading size="md">The perfect latte</Heading>
              </CardBody>

              <CardFooter>
                <Button variant="solid" colorScheme="blue">
                  Buy Latte
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </Container>
      </VStack>
    </>
  );
};
