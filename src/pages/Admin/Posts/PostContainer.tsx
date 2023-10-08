/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
// import moment from "moment";
import {
  Skeleton,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  IconButton,
  Flex,
  Input,
  InputGroup,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Collapse,
  useBreakpointValue,
  Badge,
  Select,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import MdEditor from "@uiw/react-md-editor";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAdminPostRequest,
  // getUsersRequest,
  deletePostAdmin,
  updatePostAdmin,
  creatPostAdmin,
} from "../../../apis";
import Pagination from "../../../layouts/pagination/pagination";
import TagInput from "../../../layouts/TagsInput";
import FileUpload from "../../../layouts/UploadImage";
import { CommonTable } from "../../../layouts/Table/table";
import { queryClient } from "../../../main";

const Posts: React.FC = () => {
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

  const { isOpen: isOpenModal, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const { isOpen: isOpenCollapse, onToggle } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEdit, setEdit] = useState(false);
  const toast = useToast();
  const [status, setStatus] = useState<string>("pending");
  //post to update
  const [post, setPost] = useState<{
    title: string;
    content: string | undefined;
    tags: string[];
    categories?: string[];
  }>({
    title: "",
    content: "Escape the ordinary and discover the extraordinary.....",
    tags: [],
    categories: [],
  });

  // useQuery
  const { isLoading, data } = useQuery({
    queryKey: ["Post", params],
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
  // use mutation for create api
  const createPost: any = useMutation({
    mutationFn: async (data) => await creatPostAdmin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Post"] });
      onClose();
      toast({
        title: "Post Created",
        description: "Welcome to our comunity",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    },
    onError: (error) => console.log(error),
  });
  // update mutation
  const updatePost: any = useMutation({
    mutationFn: async (data) => await updatePostAdmin(data),
    onSuccess: () => {
      onCloseAlert();
      onClose();
      toast({
        title: "Post Updated",
        description: "Welcome to our comunity",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      queryClient.invalidateQueries({ queryKey: ["Post"] });
    },
    onError: (error) => console.log(error),
  });
  const deletePost: any = useMutation({
    mutationFn: async (data) => await deletePostAdmin(data),
    onSuccess: () => {
      onCloseAlert();
      onClose();
      toast({
        title: "Post Deleted",
        description: "Status updated",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      queryClient.invalidateQueries({ queryKey: ["Post"] });
    },
    onError: (error) => console.log(error),
  });
  const columns = useMemo(
    () => [
      {
        Header: "List",
        accessor: (_: any, index: number) => index + 1,
      },
      // {
      //   Header: "Select", // Checkbox column header
      //   accessor: "isSelected", // A field to track checkbox state
      //   Cell: (row) => (
      //     <Checkbox isChecked={row.cell.value} onChange={() => row} />
      //   ),
      // },

      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "author",
        accessor: "author.email",
      },
      {
        Header: "Role",
        accessor: "author.role",
      },
      {
        Header: "Posted At",
        accessor: "posted_at",
      },
      {
        Header: "Updated At",
        accessor: "updated_at",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (row: any) => {
          return (
            <Badge
              variant="solid"
              colorScheme={row.cell.value === "approved" ? "green" : "purple"}
            >
              {row.cell.value}
            </Badge>
          );
        },
      },

      {
        Header: "Actions",
        accessor: "actions",
        Cell: (row: any) => (
          <Box display={"flex"}>
            <IconButton
              onClick={() => handleEdit(row)}
              style={{ marginRight: "10px" }}
              aria-label={""}
              icon={<EditIcon />}
            >
              Edit
            </IconButton>
            <IconButton
              onClick={() => handleDelete(row)}
              aria-label={""}
              icon={<DeleteIcon />}
            >
              Delete
            </IconButton>
          </Box>
        ),
      },
    ],
    [],
  );
  const handleEdit = (itemId: any) => {
    // Set selectedItem and open the modal here
    setEdit(true);

    const item = itemId.cell.row.original || {};
    setSelectedItem(item);
    const editTags = item?.tags.map((e: { name: string }) => e.name);
    setPost({
      ...post,
      tags: editTags,
      content: item.content,
      title: item.title,
    });
    onOpen();
  };
  const handleChange = () => {
    isEdit ? onOpenAlert() : createPost.mutate(post);
  };

  const handleDelete = async (itemId: any) => {
    setEdit(false);

    const item = itemId.cell.row.original || {};
    console.log(item);
    setSelectedItem(item);
    onOpenAlert();
  };
  const handleTagChange = (newTags: string[]) => {
    setPost({ ...post, tags: newTags });
  };
  const handleSaveModal = () => {
    isEdit
      ? updatePost.mutate({ id: selectedItem.id, data: post })
      : deletePost.mutate(selectedItem.id);
  };

  return (
    <>
      <Box>
        <Skeleton isLoaded={!isLoading}>
          {/* Search button and create layout */}
          <Box flexWrap={"wrap"}>
            <Flex mb={"7"} align="center">
              <Flex>
                <InputGroup
                  width={"md"}
                  display={useBreakpointValue({ base: "none", xl: "flex" })}
                >
                  <Input
                    // type="search"
                    placeholder="Searching........."
                    onKeyDown={(e: any) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        setParams({ ...params, keySearch: e.target.value });
                      }
                    }}
                  />
                </InputGroup>
                <Button onClick={onToggle}>Search Options</Button>
              </Flex>

              <Button
                bgColor={"pink.400"}
                color={"white"}
                onClick={() => {
                  setEdit(false);
                  setPost({
                    title: "",
                    content:
                      "Escape the ordinary and discover the extraordinary.....",
                    tags: [],
                    categories: [],
                  });
                  onOpen();
                }}
              >
                Create Post
              </Button>
            </Flex>
            <Box width={useBreakpointValue({ base: "full" })}>
              <Collapse in={isOpenCollapse} animateOpacity>
                <Box
                  p={2}
                  color="white"
                  my="1"
                  // bg="teal.500"
                  rounded="md"
                  shadow="md"
                  flexWrap={"wrap"}
                >
                  <InputGroup
                    width={"full"}
                    display={useBreakpointValue({ base: "flex", xl: "none" })}
                  >
                    <Input
                      border={"2px solid pink"}
                      type="search"
                      placeholder="Searching........"
                      onKeyDown={(e: any) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          setParams({ ...params, keySearch: e.target.value });
                        }
                      }}
                    />
                  </InputGroup>
                </Box>
              </Collapse>
            </Box>
          </Box>
          {data && <CommonTable data={data.data.posts} columns={columns} />}
        </Skeleton>
        <Pagination
          pageIndex={data?.data.pageIndex}
          pageSize={data?.data.limit}
          totalPage={data?.data.totalPage}
          setPageNumber={(pageIndex: number) =>
            setParams({
              ...params,
              pageIndex: pageIndex,
            })
          }
          setPageSize={(limit: number) =>
            setParams({
              ...params,
              limit: limit,
            })
          }
        />
      </Box>

      {/* Modal for editing */}
      <Modal isOpen={isOpenModal} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? "Edit Post" : "Create Post"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid
              templateColumns={"repeat(2, 1fr)"}
              gap={1}
              mb={3}
              templateRows={"repeat(1, 1fr)"}
            >
              <GridItem w="100%" p={1}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    defaultValue={isEdit ? selectedItem.title : post.title}
                    type="text"
                    onChange={(value) =>
                      setPost({ ...post, title: value.target.value })
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem w="100%" p={1}>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select
                    disabled={
                      isEdit
                        ? selectedItem?.status === "approved" && true
                        : false
                    }
                    defaultValue={selectedItem?.status || status}
                    onChange={(value) => {
                      setStatus(value.target.value);
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem rowSpan={8} colSpan={2}>
                <Box p={1}>
                  <TagInput tags={post.tags} onChange={handleTagChange} />
                </Box>
              </GridItem>
            </Grid>
            <MdEditor
              value={post.content}
              onChange={(value) => {
                setPost({ ...post, content: value });
              }}
            />
            <Box mt={6}>
              <FileUpload />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleChange}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* alert modal */}
      <AlertDialog isOpen={isOpenAlert} onClose={onCloseAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {isEdit ? "Update Post" : "Delete Post"}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onCloseAlert}>Cancel</Button>
              <Button
                colorScheme={isEdit ? "pink" : "red"}
                onClick={handleSaveModal}
                ml={3}
              >
                {isEdit ? "Save" : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Posts;
