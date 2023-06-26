import { React, useEffect, useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import UserLayout from "../Homepage/UserLayout";
import { setPosts } from "../../state";
import Postwidget from "../Postswidgets/Postwidget";
import Navbar from "../Navbar/Navbar";
import FriendsListLayout from "../../components/FriendsListLayout";

const Profilepage = () => {
  const [posts, setposts] = useState([]);
  const [user, setuser] = useState([]);
  console.log(user);
  const { userid } = useParams();
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const isFriends = useSelector((state) => state.user.friends);
  const { _id, picturepath } = useSelector((state) => state.user);

  const userPosts = useSelector((state) => state.posts);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  const getUserPosts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/post/${userid}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const posts = await res.json();
      console.log(posts);
      dispatch(setPosts({ posts: posts }));
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/user/${userid}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      setuser(user);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getUserPosts();
  }, []);
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Navbar searchedResults={searchedResults} />
      <Box
        display={isNonMobileScreens ? "flex" : "block"}
        width="100vw"
        minHeight="100vh"
        backgroundColor={theme.palette.background.default}>
        <Box
          flexBasis={isNonMobileScreens ? "35%" : undefined}
          height="100%"
          display="flex"
          flexDirection="column"
          alignItems="center">
          <Box
            width="80%"
            margin="50px"
            marginTop="20px"
            backgroundColor={theme.palette.background.alt}
            borderRadius="20px">
            <UserLayout userId={userid} picturePath={user.picturepath} />
          </Box>
          {isFriends.length ? (
            <Box
              width="80%"
              padding="0.7rem"
              backgroundColor={theme.palette.background.alt}
              borderRadius="20px">
              <FriendsListLayout />
            </Box>
          ) : null}
        </Box>

        <Box flexBasis={isNonMobileScreens ? "60%" : undefined}>
          {posts.length
            ? posts.map(
                ({
                  _id,
                  userid,
                  firstname,
                  lastname,
                  userpicturepath,
                  picturepath,
                  occupation,
                  location,
                  description,
                  likes,
                  comments,
                }) => (
                  <Postwidget
                    key={_id}
                    postid={_id}
                    postUserid={userid}
                    name={`${firstname} ${lastname}`}
                    description={description}
                    occupation={occupation}
                    location={location}
                    likes={likes}
                    comments={comments}
                    picturepath={picturepath}
                    userpicturepath={userpicturepath}
                  />
                )
              )
            : userPosts.map(
                ({
                  _id,
                  userid,
                  firstname,
                  lastname,
                  userpicturepath,
                  picturepath,
                  occupation,
                  location,
                  description,
                  likes,
                  comments,
                }) => (
                  <Postwidget
                    key={_id}
                    postid={_id}
                    postUserid={userid}
                    name={`${firstname} ${lastname}`}
                    description={description}
                    occupation={occupation}
                    location={location}
                    likes={likes}
                    comments={comments}
                    picturepath={picturepath}
                    userpicturepath={userpicturepath}
                  />
                )
              )}
        </Box>
      </Box>
    </>
  );
};

export default Profilepage;
