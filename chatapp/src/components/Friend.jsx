import React from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import UserImage from "./UserImage";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";

const Friend = ({ friendid, userpicturepath, location, name }) => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const id = useSelector((state) => state.user._id);

  const isfriend =
    user.friends.length &&
    user.friends.find((friend) => friend._id === friendid);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const AddRemoveFriends = async () => {
    try {
      const res = await fetch(`http://localhost:5000/user/${id}/${friendid}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const updatedFriends = await res.json();
      console.log(updatedFriends);
      if (updatedFriends.length !== 0) {
        dispatch(setFriends({ friends: updatedFriends }));
      } else {
        dispatch(setFriends({ friends: [] }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      borderRadius="60px">
      <Box
        sx={{ "&:hover": { cursor: "pointer" } }}
        onClick={() => navigate(`/profile/${friendid}`)}
        display="flex"
        justifyContent="space-between"
        gap="30px"
        alignItems="center">
        <UserImage picture={userpicturepath} />
        <Box padding="0.5rem">
          {name && (
            <>
              <Typography fontSize="17px" color={theme.palette.secondary.main}>
                {name}
              </Typography>
              <Typography color={theme.palette.secondary.main}>
                {location}
              </Typography>
            </>
          )}
        </Box>
      </Box>

      <IconButton onClick={AddRemoveFriends}>
        {isfriend ? (
          <PersonRemoveOutlined sx={{ color: "white", fontSize: "20px" }} />
        ) : (
          <PersonAddOutlined sx={{ color: "white", fontSize: "20px" }} />
        )}
      </IconButton>
    </Box>
  );
};

export default Friend;
