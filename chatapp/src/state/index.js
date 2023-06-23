import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  token: null,
  posts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setmode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.token = null;
      state.user = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user non existent");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedpots = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedpots;
    },
  },
});

export const { setmode, setLogin, setLogout, setFriends, setPost, setPosts } =
  authSlice.actions;
export default authSlice.reducer;
