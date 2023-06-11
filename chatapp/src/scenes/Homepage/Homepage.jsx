import { React, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import UserLayout from "./UserLayout";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../../state";
import MyPostLayout from "../Postswidgets/MyPostLayout";

const Homepage = ({ mode, handlemode }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem("loggeduser");

    const data = JSON.parse(user);
    console.log(data);

    dispatch(setLogin({ user: data.user, token: data.token }));
  }, [dispatch]);
  const { _id, picturepath } = useSelector((state) => state.user);
  const theme = useTheme();

  return (
    <Box>
      <Navbar mode={mode} handlemode={handlemode} />
      <Box
        display={isNonMobileScreens ? "flex" : "block"}
        width="100%"
        height="100%"
        gap="40px"
        backgroundColor={theme.palette.background.default}>
        <Box
          flexBasis={isNonMobileScreens ? "25%" : undefined}
          display="flex"
          flexDirection="column"
          borderRadius="40px"
          marginTop="20px"
          marginLeft="20px"
          backgroundColor={theme.palette.background.alt}>
          <UserLayout userId={_id} picturePath={picturepath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "35%" : undefined}
          border={`1px solid ${theme.palette.secondary.light}`}
          marginTop="1.5rem"
          padding="1rem"
          borderRadius="20px">
          <MyPostLayout picturePath={picturepath} />
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
