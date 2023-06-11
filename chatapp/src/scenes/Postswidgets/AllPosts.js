import { React, useEffect } from "react";
import { useDispatch, useSelector, usesDispatch } from "react-redux";
import { setPosts } from "../../state";
import Postwidget from "./Postwidget";
const AllPosts = ({ userid, profile = false }) => {
  const posts = useSelector((state) => state.posts);
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
    }
  }, []);
  return (
    <>
      {posts.map(
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
          />
        )
      )}
    </>
  );
};

export default AllPosts;
