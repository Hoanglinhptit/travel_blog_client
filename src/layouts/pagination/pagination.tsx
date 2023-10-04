/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  Tooltip,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
interface Props {
  setPageNumber: (e: number) => void;
  setPageSize: (limit: number) => void;
  pageIndex: number;
  totalPage: number;
  pageSize: number;
}
const Pagination: React.FC<Props> = (props) => {
  return (
    <>
      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              onClick={() => props.setPageNumber(1)}
              isDisabled={props.pageIndex === 1 ? true : false}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
              aria-label={""}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              onClick={() => props.setPageNumber(props.pageIndex - 1)}
              isDisabled={props.pageIndex === 1 ? true : false}
              icon={<ChevronLeftIcon h={6} w={6} />}
              aria-label={""}
            />
          </Tooltip>
        </Flex>

        <Flex
          alignItems="center"
          display={useBreakpointValue({ base: "none", md: "flex" })}
        >
          <Text flexShrink="0" mr={2} marginLeft={2}>
            Page{" "}
            <Text fontWeight="bold" as="span">
              {props.pageIndex}
            </Text>{" "}
            of{" "}
            <Text fontWeight="bold" as="span">
              {props.totalPage}
            </Text>
          </Text>
          <Text flexShrink="0"> Go to page:</Text>{" "}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            defaultValue={props.pageIndex}
            max={props.totalPage}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                // Prevent the default Enter key behavior (e.g., form submission)
                e.preventDefault();

                // Update the page number with the current input value
                props.setPageNumber(Number(e.target.value));
              }
            }}
            //   {pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={props.pageSize}
            onChange={(e) => {
              props.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex display={useBreakpointValue({ md: "none" })}>
          {props.pageIndex}
        </Flex>
        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              onClick={() => {
                console.log("function work", props.setPageNumber(1));

                props.setPageNumber(props.pageIndex + 1);
              }}
              isDisabled={props.pageIndex === props.totalPage}
              icon={<ChevronRightIcon h={6} w={6} />}
              aria-label={""}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              onClick={() => props.setPageNumber(props.totalPage)}
              isDisabled={props.pageIndex === props.totalPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
              aria-label={""}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </>
  );
};
export default Pagination;
