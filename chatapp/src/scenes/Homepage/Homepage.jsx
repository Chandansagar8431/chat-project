import { React, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import UserLayout from "./UserLayout";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../../state";
import MyPostLayout from "../Postswidgets/MyPostLayout";
import AllPosts from "../Postswidgets/AllPosts";
import FriendsListLayout from "../../components/FriendsListLayout";

const Homepage = ({ mode, handlemode }) => {
  const [posts, setposts] = useState([]);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const userid = useSelector((state) => state.user._id);
  const friends = useSelector((state) => state.user.friends);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem("loggeduser");

    const data = JSON.parse(user);

    dispatch(setLogin({ user: data.user, token: data.token }));
  }, [dispatch]);

  const { _id, picturepath } = useSelector((state) => state.user);
  const theme = useTheme();

  /* getting the only serach posts  */
  const searchedResults = (searchResults, search) => {
    console.log(searchResults);
    console.log(search);
    const filteredResults =
      searchResults &&
      searchResults.filter((post) =>
        post.description.toLowerCase().includes(search.toLowerCase())
      );
    console.log(filteredResults);
    setposts(filteredResults);
  };

  return (
    <Box>
      <Navbar
        mode={mode}
        handlemode={handlemode}
        searchedResults={searchedResults}
      />
      <Box
        display={isNonMobileScreens ? "flex" : "block"}
        width="100%"
        minHeight="100vh"
        gap="40px"
        backgroundColor={theme.palette.background.default}>
        <Box
          height="100%"
          flexBasis={isNonMobileScreens ? "30%" : undefined}
          display="flex"
          flexDirection="column"
          borderRadius="40px"
          marginTop="20px"
          marginLeft="20px"
          backgroundColor={theme.palette.background.alt}>
          <UserLayout userId={_id} picturePath={picturepath} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          flexBasis={isNonMobileScreens ? "45%" : undefined}
          /*    border={`1px solid ${theme.palette.secondary.light}`} */

          marginTop="1.5rem"
          padding="1rem"
          borderRadius="20px">
          <MyPostLayout picturePath={picturepath} />

          <AllPosts userid={userid} posts={posts} />
        </Box>
        {friends.length ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            flexBasis={isNonMobileScreens ? "30%" : undefined}
            padding="1rem"
            marginTop="20px"
            height="100%"
            marginRight="20px"
            backgroundColor={theme.palette.background.alt}
            borderRadius="20px">
            <FriendsListLayout />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default Homepage;
