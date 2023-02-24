import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  useTheme,
  Button,
  Typography,
  useMediaQuery,
  InputBase,
} from "@mui/material";
import StyledFlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWarpper from "components/WidgetWrapper";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState("");
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobilScreen = useMediaQuery("(min-width:1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const resonse = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const posts = await resonse.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPosts("");
  };

  return (
    <WidgetWarpper>
      <StyledFlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette?.neutral?.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </StyledFlexBetween>
      {isImage && (
        <Box
          borderRadius="5px"
          border={`1px solid ${medium}`}
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            accept=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <StyledFlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <StyledFlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </StyledFlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </StyledFlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />
      <StyledFlexBetween>
        <StyledFlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: medium }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </StyledFlexBetween>
        {isNonMobilScreen ? (
          <>
            <StyledFlexBetween gap="0.25rem">
              <GifBoxOutlined />
              <Typography color={mediumMain}>Clip</Typography>
            </StyledFlexBetween>
            <StyledFlexBetween gap="0.25rem">
              <AttachFileOutlined />
              <Typography color={mediumMain}>Attachment</Typography>
            </StyledFlexBetween>{" "}
            <StyledFlexBetween gap="0.25rem">
              <MicOutlined />
              <Typography color={mediumMain}>Audio</Typography>
            </StyledFlexBetween>{" "}
          </>
        ) : (
          <StyledFlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </StyledFlexBetween>
        )}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            background: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </StyledFlexBetween>
    </WidgetWarpper>
  );
};

export default MyPostWidget;
