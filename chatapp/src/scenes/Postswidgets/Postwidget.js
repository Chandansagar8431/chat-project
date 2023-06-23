import React, { useState, useEffect } from "react";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserImage from "../../components/UserImage";
import Friend from "../../components/Friend";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  ArrowRightAltOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import Flexbetween from "../../components/Flexbetween";
import { setPost, setPosts } from "../../state";

const Postwidget = ({
  postid,
  postUserid,
  name,
  location,
  occupation,
  likes,
  comments,
  description,
  picturepath,
  userpicturepath,
}) => {
  const [comment, setcomment] = useState("");
  const [commentList, setcommentList] = useState([]);

  const [iscomment, setiscomment] = useState(false);
  const [loadpost, setloadpost] = useState(false);
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = likes && Boolean(likes[loggedInUserId]);
  const noOfLikes = Number(likes && Object.keys(likes).length);
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const getAllPosts = async () => {
    const res = await fetch("http://localhost:5000/post/all", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const posts = await res.json();
    dispatch(setPosts({ posts: posts }));
  };
  const Addcomments = async () => {
    const res = await fetch(`http://localhost:5000/post/comment/${postid}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: `${comment} ${loggedInUserId}` }),
    });

    const post = await res.json();
    dispatch(setPost({ post: post }));
    /*  setcommentList([...comments, comment]); */
    setcomment("");
  };

  /*  useEffect(() => {
    getAllPosts();
  }, [loadpost]); */
  const PatchLike = async () => {
    try {
      const updatedPost = await fetch(`http://localhost:5000/post/${postid}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ userid: loggedInUserId }),
      });
      const post = await updatedPost.json();
      dispatch(setPost({ post: post }));
    } catch (error) {
      console.log(error);
    }
  };
  const Deletecomment = async (commentid) => {
    try {
      const res = await fetch(
        `http://localhost:5000/post/delcomment/${postid}/${commentid}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loggedInUserId: loggedInUserId }),
        }
      );
      const post = await res.json();
      dispatch(setPost({ post: post }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      backgroundColor={theme.palette.background.alt}
      borderRadius="20px"
      padding="1 rem  0.5rem"
      marginY="10px">
      <Box
        display="flex"
        justifyContent="space-between"
        marginY="15px"
        padding="0.5rem">
        <Friend
          friendid={postUserid}
          userpicturepath={userpicturepath}
          location={location}
          name={name}
        />
      </Box>
      <Divider sx={{ backgroundColor: "#0E3036", marginY: "5px" }} />
      <Box marginTop="10px" paddingX="10px">
        <Typography
          sx={{
            color: theme.palette.secondary.main,
            marginBottom: "10px",
            fontWeight: "500",
            fontSize: "15px",
          }}>
          {description}{" "}
        </Typography>

        <img
          style={{ borderRadius: "20px" }}
          width="100%"
          src={`http://localhost:5000/assets/${picturepath}`}
          alt="picturepost"
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        marginX="10px"
        gap="15px"
        marginY="7px"
        justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <IconButton onClick={PatchLike}>
            {isLiked ? (
              <FavoriteOutlined sx={{ color: "#873890", fontSize: "20px" }} />
            ) : (
              <FavoriteBorderOutlined
                sx={{ color: "#873838", fontSize: "20px" }}
              />
            )}
          </IconButton>
          <Typography
            sx={{ color: "white", fontSize: "15px", marginRight: "15px" }}>
            {noOfLikes ? noOfLikes : 0}
          </Typography>

          <IconButton onClick={() => setiscomment(!iscomment)}>
            <ChatBubbleOutlineOutlined
              sx={{ color: "white", fontSize: "20px" }}
            />
          </IconButton>
        </Box>
        <IconButton>
          <ShareOutlined sx={{ color: "white", fontSize: "20px" }} />
        </IconButton>
      </Box>
      {iscomment ? (
        <>
          <Box
            width="100%"
            display="flex"
            justifyContent="flex-start"
            alignItems="center">
            <InputBase
              value={comment}
              onChange={(e) => {
                setcomment(e.target.value);
              }}
              placeholder="comment it here"
              sx={{
                width: "60%",
                backgroundColor: theme.palette.background.alt,
                border: `2px solid ${theme.palette.secondary.light}`,
                margin: "0.5rem",
                borderRadius: "20px",
                paddingLeft: "9px",
              }}></InputBase>
            <IconButton
              onClick={() => {
                Addcomments();
                setloadpost(!loadpost);
              }}
              sx={{ backgroundColor: theme.palette.primary.light }}>
              <ArrowRightAltOutlined sx={{ color: "white" }} />{" "}
            </IconButton>
          </Box>
          <Box>
            {comments.map((comment, i) => (
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap="5px"
                paddingLeft="10px"
                marginY="8px"
                key={`${name} ${i}`}>
                <Typography sx={{ color: "white" }}>
                  {comment.split(" ")[0]}
                </Typography>
                {loggedInUserId === comment.split(" ")[1] ? (
                  <IconButton
                    onClick={() => {
                      Deletecomment(i);
                    }}>
                    <DeleteOutlined
                      sx={{ color: theme.palette.secondary.medium }}
                    />
                  </IconButton>
                ) : null}
              </Box>
            ))}
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default Postwidget;
