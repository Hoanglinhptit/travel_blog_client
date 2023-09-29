import React, { useState } from "react";
import { Box, Input, Flex, Button, Badge, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface TagInputProps {
  tags: string[];
  onChange: (newTags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
  const [tagValue, setTagValue] = useState<string>("#");

  const handleAddTag = () => {
    if (tagValue.trim() !== "") {
      const newTags = [...tags, tagValue];
      onChange(newTags);
      setTagValue("");
    }
  };

  const handleDeleteTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  return (
    <Box>
      <Flex flexWrap="wrap">
        {tags.map((tag, index) => (
          <Box key={index} m={1}>
            <Badge colorScheme="purple" fontSize="1.2rem">
              {tag}{" "}
              <IconButton
                ml={1}
                size="sm"
                colorScheme="purple"
                onClick={() => handleDeleteTag(index)}
                aria-label={""}
                icon={<DeleteIcon />}
              ></IconButton>
            </Badge>
          </Box>
        ))}
      </Flex>
      <Input
        type="text"
        placeholder="Add a tag #"
        value={tagValue}
        onChange={(e) => setTagValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleAddTag();
          }
        }}
      />
      <Button
        mt={2}
        size="sm"
        onClick={handleAddTag}
        bg={"pink.400"}
        color={"white"}
      >
        Add Hash Tag #
      </Button>
    </Box>
  );
};

export default TagInput;
