// FileUpload.tsx
import { Box, Button, Center, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { upLoadImgFile } from "../apis";

const FileUpload = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await upLoadImgFile(formData);
        // axios.post(
        //   `http://localhost:3000/api/file/upload`,
        //   formData,
        //   {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //       Authorization: `Bearer ${localStorage
        //         .getItem("auth_token")
        //         ?.toString()}`,
        //     },
        //   }
        // );
        setTimeout(() => console.log("response", response), 3000);

        if (response.data && response.data.url) {
          setImage(response.data.url);
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <VStack spacing={4}>
      {/* <Cloudinary cloudName={cloudName}> */}
      <Box height="200px" width={"full"}>
        {image ? (
          <Box display={"flex"} maxW={"unset"} justifyContent={"space-evenly"}>
            <img src={image} alt="Uploaded" height="200px" width="200px" />
            <div style={{ overflowWrap: "break-word", width: "250px" }}>
              Paste this url : "{`![image](${image})`}"
            </div>
          </Box>
        ) : (
          <Center
            width="100%"
            height="100%"
            border="2px dashed gray"
            borderRadius="md"
          >
            {loading ? (
              "Uploading..."
            ) : (
              <>
                <AddIcon boxSize={6} />
                <div>Click or drag to upload</div>
              </>
            )}
          </Center>
        )}
      </Box>
      {/* </Cloudinary> */}
      <input
        type="file"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput">
        <Button
          as="span"
          colorScheme="teal"
          size="sm"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          Upload Image
        </Button>
      </label>
    </VStack>
  );
};

export default FileUpload;
