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
import {
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  getUsersRequest,
  updateUserAdmin,
  deleteUserAdmin,
} from "../../../apis";
import Pagination from "../../../layouts/pagination/pagination";
import { CommonTable } from "../../../layouts/Table/table";
import { queryClient } from "../../../main";

const Users: React.FC = () => {
  const [params, setParams] = useState<{
    keySearch: string;
    pageIndex: number;
    limit: number;
  }>({
    keySearch: "",
    pageIndex: 1,
    limit: 10,
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
  const [user, setUser] = useState<{
    email: string;
    name: string;
    role: string;
  }>({
    email: "",
    name: "",
    role: "",
  });

  // useQuery
  const { isLoading, data } = useQuery({
    queryKey: ["Users", params, user],
    queryFn: async () => {
      try {
        const data = await getUsersRequest(params);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    retry: 10,
  });

  // update mutation
  const updateUser: UseMutationResult = useMutation({
    mutationFn: async (data) => await updateUserAdmin(data),
    onSuccess: () => {
      onCloseAlert();
      onClose();
      toast({
        title: "User Updated",
        description: "Welcome to our comunity",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: (error) => console.log(error),
  });
  const deleteUser: UseMutationResult = useMutation({
    mutationFn: async (data) => await deleteUserAdmin(data),
    onSuccess: () => {
      onCloseAlert();
      onClose();
      toast({
        title: "User Deleted",
        description: "Status updated",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: (error) => console.log(error),
  });
  const columns = useMemo(
    () => [
      {
        Header: "List",
        accessor: (_row: any, index: number) => index + 1,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "ID",
        accessor: "id",
      },

      {
        Header: "Role",
        accessor: "role",
        Cell: (row: any) => {
          return (
            <Badge
              variant="solid"
              colorScheme={row.cell.value === "admin" ? "green" : "purple"}
            >
              {row.cell.value}
            </Badge>
          );
        },
      },
      {
        Header: "Post",
        accessor: "",
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

    setTimeout(() => onOpen(), 500);
  };
  const handleChange = () => {
    isEdit && onOpenAlert();
  };

  const handleDelete = async (itemId: any) => {
    setEdit(false);

    const item = itemId.cell.row.original || {};
    setSelectedItem(item);
    onOpenAlert();
  };

  const handleSaveModal = () => {
    isEdit
      ? updateUser.mutate({
          id: selectedItem.id,
          data: {
            role: user.role,
          },
        })
      : deleteUser.mutate(selectedItem.id);
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

              {/* <Button
                bgColor={"pink.400"}
                color={"white"}
                onClick={() => {
                  setEdit(false);

                  onOpen();
                }}
              >
                Create Post
              </Button> */}
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
          <Box>
            {data && <CommonTable data={data.data.users} columns={columns} />}
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
        </Skeleton>
      </Box>

      {/* Modal for editing */}
      <Modal isOpen={isOpenModal} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit && "Edit User"}</ModalHeader>
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
                  <FormLabel>User name</FormLabel>
                  <Input
                    value={isEdit ? selectedItem.name : ""}
                    readOnly={true}
                    type="text"
                  />
                </FormControl>
              </GridItem>
              <GridItem w="100%" p={1}>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Select
                    disabled={
                      isEdit ? selectedItem?.role === "admin" && true : false
                    }
                    defaultValue={selectedItem?.role || "user"}
                    onChange={(value) => {
                      setUser({ ...user, role: value.target.value });
                    }}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem rowSpan={8} colSpan={2}>
                <Box p={1}>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={isEdit ? selectedItem.email : ""}
                      readOnly={true}
                      type="text"
                    />
                  </FormControl>
                </Box>
              </GridItem>
            </Grid>
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
              {isEdit ? "Update User" : "Delete User"}
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

export default Users;
