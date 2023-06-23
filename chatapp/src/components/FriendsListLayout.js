import { React, useEffect, useState } from "react";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Friend from "./Friend";
import { setFriends } from "../state";

const FriendsListLayout = ({ userid }) => {
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const id = useSelector((state) => state.user._id);
  console.log(friends);

  const dispatch = useDispatch();
  useEffect(() => {
    getFriendsLists();
  }, []);
  const getFriendsLists = async () => {
    const res = await fetch(`http://localhost:5000/user/friends/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const friendsLists = await res.json();
    console.log(friendsLists);
    dispatch(setFriends({ friends: friendsLists }));
  };
  console.log(friends);
  return (
    <Box
      width="100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="20px">
      <Typography
        marginBottom="20px"
        fontWeight="300"
        fontSize="20px"
        sx={{
          color: theme.palette.secondary.main,
        }}>
        Friends Lists
      </Typography>
      {friends.map((friend) => (
        <Box key={`${friend._id} ${friend.firstname}`}>
          <Friend
            key={`${friend._id} ${friend.firstname}`}
            friendid={friend._id}
            userpicturepath={friend.picturepath}
            location={friend.location}
            name={`${friend.firstname} ${friend.lastname}`}
          />
          <Divider sx={{ border: "1px dashed white", marginY: "10px" }} />
        </Box>
      ))}
    </Box>
  );
};

export default FriendsListLayout;
