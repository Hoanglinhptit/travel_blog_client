import { VStack, Container, useBreakpointValue } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CaptionCarousel from "../../layouts/carousels";
import ArticleList from "src/layouts/blog-card";
import { getAdminPostRequest } from "src/apis";
export const Home: React.FC = () => {
  const [params, setParams] = useState<{
    keySearch: string;
    pageIndex: number;
    limit: number;
    tagSearch?: Array<string>;
  }>({
    keySearch: "",
    pageIndex: 1,
    limit: 10,
    tagSearch: [],
  });
  const containerMaxW = useBreakpointValue({
    // base: "container.sm",
    md: "container.sm",
    xl: "container.lg",
    "2xl": "container.xl",
  });

  const { isLoading, data } = useQuery({
    queryKey: ["Home", params],
    queryFn: async () => {
      try {
        const data = await getAdminPostRequest(params);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    retry: 10,
  });
  return (
    <>
      <VStack marginTop="10">
        <Container
          maxW={containerMaxW}
          // bg="green.400"
          color="#262626"
          centerContent
          padding={0}
        >
          <CaptionCarousel />

          {!isLoading
            ? data.data.posts.map((e) => (
                <ArticleList source={e.content} title={e.title} />
              ))
            : null}
        </Container>
      </VStack>
    </>
  );
};
