import { React, useEffect, useState } from "react";
import AllPosts from "./AllPosts";
import {
  EditOutlined,
  DeleteOutlineOutlined,
  AttachFileOutlined,
  ImageOutlined,
  MicOutlined,
  ArrowRightAltOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  InputBase,
  Divider,
  Button,
} from "@mui/material";
import axios from "axios";
import UserImage from "../../components/UserImage";
import Flexbetween from "../../components/Flexbetween";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

import { setPosts } from "../../state";

const MyPostLayout = ({ picturePath }) => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  console.log(user._id);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isImage, setisImage] = useState(false);
  const [image, setimage] = useState(null);
  const [post, setpost] = useState("");

  console.log(post);
  const UserPost = async () => {
    console.log("hi");
    const postdata = new FormData();

    postdata.append("userid", user._id);
    postdata.append("description", post);

    if (image) {
      postdata.append("picture", image);
      postdata.append("picturepath", image.name);
    }

    console.log(postdata);

    const res = await fetch("http://localhost:5000/post", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: postdata,
    });
    const postresponse = await res.json();
    console.log(postresponse);
    dispatch(setPosts({ posts: postresponse }));
    setimage(null);
    setpost("");
    console.log(post);
  };

  return (
    <>
      <Box
        display="flex"
        gap="40px"
        paddingLeft="10px"
        border={`1px solid ${theme.palette.secondary.light}`}
        borderRadius="20px"
        padding="1rem">
        <UserImage picture={picturePath} />
        <Box display="flex" alignItems="center" gap="180px">
          <Box flexBasis="100%">
            <InputBase
              placeholder="what's in your mind ..."
              onChange={(e) => setpost(e.target.value)}
              value={post}
              sx={{
                fontSize: "17px",
                width: "150%",
                borderRadius: "20px",
                backgroundColor: theme.palette.background.alt,
                paddingX: "10px",
              }}
            />
          </Box>
          <Button
            disabled={!post}
            onClick={UserPost}
            sx={{
              "&:hover": { backgroundColor: theme.palette.background.default },
              fontSize: "15px",
            }}>
            Post
            <ArrowRightAltOutlined
              sx={{
                color: theme.palette.secondary.medium,
              }}
            />
          </Button>
        </Box>
      </Box>
      <Divider sx={{ marginTop: "15px" }} />
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        marginTop="10px"
        backgroundColor={theme.palette.background.default}
        borderRadius="10px">
        <ImageOutlined
          sx={{
            color: theme.palette.secondary.medium,
            "&:hover": { cursor: "pointer" },
          }}
          onClick={() => setisImage(!isImage)}
        />
        <AttachFileOutlined
          sx={{
            color: theme.palette.secondary.medium,
            "&:hover": { cursor: "pointer" },
          }}
        />

        <DeleteOutlineOutlined
          sx={{
            color: theme.palette.secondary.medium,
            "&:hover": { cursor: "pointer" },
          }}
        />
        <EditOutlined
          sx={{
            color: theme.palette.secondary.medium,
            "&:hover": { cursor: "pointer" },
          }}
        />
      </Box>
      {isImage && (
        <Flexbetween>
          <Box
            marginTop="10px"
            width="100%"
            height="30px"
            border={`1px dashed ${theme.palette.secondary.medium}`}
            borderRadius="10px">
            <Dropzone
              acceptedFiles=".jpeg,.jpg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setimage(acceptedFiles[0])}>
              {({ getInputProps, getRootProps }) => (
                <Box
                  padding="4.5px"
                  {...getRootProps()}
                  sx={{ "&:hover": { cursor: "pointer" } }}>
                  <input {...getInputProps()} />
                  {!image && (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center">
                      <Typography
                        sx={{ color: theme.palette.secondary.medium }}>
                        add imaage here
                      </Typography>
                    </Box>
                  )}
                  {image && (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      gap="10px">
                      <Typography
                        sx={{ color: theme.palette.secondary.medium }}>
                        {image.name}
                      </Typography>
                      <EditOutlined
                        fontSize="small"
                        sx={{ color: theme.palette.secondary.medium }}
                      />
                    </Box>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>
          {isImage && (
            <DeleteOutlineOutlined
              sx={{
                color: theme.palette.secondary.medium,
                marginTop: "7px",
                paddingLeft: "4px",
                "&:hover": { cursor: "pointer" },
              }}
              onClick={() => setimage(null)}
            />
          )}
        </Flexbetween>
      )}
      <Divider sx={{ marginTop: "10px", marginBottom: "6px" }} />
    </>
  );
};

export default MyPostLayout;
