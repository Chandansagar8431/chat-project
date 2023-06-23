import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import Postwidget from "./Postwidget";
const AllPosts = ({ userid, profile = false, posts }) => {
  const statePosts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const dispacth = useDispatch();

  const getAllPosts = async () => {
    const res = await fetch("http://localhost:5000/post/all", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const posts = await res.json();
    dispacth(setPosts({ posts: posts }));
  };

  const getUserPosts = async () => {
    const res = await fetch(`http://localhost:5000/post/${userid}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const posts = await res.json();
    dispacth(setPosts({ posts: posts }));
  };
  useEffect(() => {
    if (profile) {
      getUserPosts();
    } else {
      getAllPosts();
      console.log(statePosts);
      console.log(posts);
    }
  }, []);
  /*  useEffect(() => {
    const getSearchPosts = async () => {
      const searchedPosts = posts.filter((post) =>
        post.description.toLowerCase().includes(search.toLowerCase())
      );
      setsearchResult(searchedPosts);
    };
    getSearchPosts();
  }, []); */
  return (
    <>
      {posts.length
        ? posts.length &&
          posts.map(
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
                location={location}
                occupation={occupation}
                picturepath={picturepath}
                userpicturepath={userpicturepath}
                likes={likes}
                comments={comments}
                description={description}
              />
            )
          )
        : statePosts.length &&
          statePosts.map(
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
                location={location}
                occupation={occupation}
                picturepath={picturepath}
                userpicturepath={userpicturepath}
                likes={likes}
                comments={comments}
                description={description}
              />
            )
          )}
    </>
  );
};

export default AllPosts;
