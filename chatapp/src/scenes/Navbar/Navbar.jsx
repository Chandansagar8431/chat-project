import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useTheme,
  useMediaQuery,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Flexbetween from "../../components/Flexbetween";
import { Menu, Search } from "@mui/icons-material";
import { Typography, InputBase, IconButton, Box } from "@mui/material";
import {
  DarkMode,
  LightMode,
  Message,
  Help,
  Notifications,
  Close,
} from "@mui/icons-material";
import { setLogout, setPosts } from "../../state";
import { useDispatch, useSelector } from "react-redux";
const Navbar = ({ mode, handlemode, searchedResults }) => {
  const [search, setsearch] = useState("");
  const [searchResults, setsearchResult] = useState([]);

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  const [toggleMobileMenu, settoggleMobileMenu] = useState(false);
  const isNonMobilescreen = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const primary = theme.palette.primary;
  const alt = theme.palette.background.alt;
  const background = theme.palette.background.default;
  const dark = theme.palette.secondary.dark;
  const medium = theme.palette.secondary.medium;
  const light = theme.palette.primary.light;
  const neutrallight = theme.palette.secondary.light;

  const getPosts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/post/all`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const posts = await res.json();
      dispatch(setPosts({ posts: posts }));
      setsearchResult(posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
    searchedResults(searchResults, search);
  }, [search]);
  return (
    <Flexbetween padding="1rem 6%" backgroundColor={alt} margin="0">
      <Flexbetween gap="2rem">
        <Typography
          fontSize="clamp(1rem,2rem,2.5rem)"
          fontWeight="bold"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{ "&:hover": { cursor: "pointer" } }}>
          Chat pedia
        </Typography>
        {isNonMobilescreen && (
          <Flexbetween
            backgroundColor={light}
            paddingX="0.5rem"
            borderRadius="5px">
            <InputBase
              placeholder="search..."
              sx={{ fontSize: "20px" }}
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
            />
            <Search sx={{ fontSize: "25px", color: "#7e999e" }} />
          </Flexbetween>
        )}
      </Flexbetween>
      {isNonMobilescreen ? (
        <Flexbetween gap="2rem" height="30px">
          <IconButton onClick={handlemode}>
            {mode === "dark" ? (
              <LightMode sx={{ color: {} }} />
            ) : (
              <DarkMode sx={{ color: dark }} />
            )}
          </IconButton>
          <Message sx={{ color: dark }} />
          <Help sx={{ color: dark }} />
          <Notifications sx={{ color: dark }} />
          <FormControl varient="standard">
            <Select
              value={`${user.firstname} ${user.lastname}`}
              sx={{
                "& .MuiSvgIcon-root": { width: "2rem" },
                "& .MuiSelect-select:focus": {
                  backgroundColor: theme.palette.background.default,
                  borderRadius: "20px",
                },
                width: "200px",
                borderRadius: "20px",
              }}>
              <MenuItem
                value={`${user.firstname} ${user.lastname}`}
                onClick={() => navigate(`/profile/${user._id}`)}>
                <Typography sx={{ fontSize: "15px" }}>
                  {" "}
                  {`${user.firstname} ${user.lastname}`}
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(setLogout());
                  navigate("/");
                }}
                sx={{ fontSize: "15px", paddingX: "1.0rem" }}>
                Logout
              </MenuItem>
            </Select>
          </FormControl>
        </Flexbetween>
      ) : (
        <IconButton onClick={() => settoggleMobileMenu(!toggleMobileMenu)}>
          <Menu sx={{ fontSize: "25px" }} />
        </IconButton>
      )}
      {!isNonMobilescreen && toggleMobileMenu && (
        <Box
          position="fixed"
          right="0"
          top="8px"
          bottom="0"
          height="100%"
          width="250px"
          zIndex="10"
          backgroundColor={background}>
          <Box>
            <IconButton>
              <Close onClick={() => settoggleMobileMenu(!toggleMobileMenu)} />
            </IconButton>
            <Flexbetween gap="2rem" flexDirection="column">
              <IconButton onClick={handlemode}>
                {mode === "dark" ? (
                  <LightMode sx={{ color: {} }} />
                ) : (
                  <DarkMode sx={{ color: dark }} />
                )}
              </IconButton>
              <Message sx={{ color: dark }} />
              <Help sx={{ color: dark }} />
              <Notifications sx={{ color: dark }} />
              <FormControl varient="standard">
                <Select
                  value="chandan sagar"
                  sx={{
                    "& .MuiSvgIcon-root": { width: "2rem" },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutrallight,
                      borderRadius: "20px",
                    },
                    width: "200px",
                    borderRadius: "20px",
                  }}>
                  <MenuItem value="chandan sagar">
                    <Typography sx={{ fontSize: "15px" }}>
                      chandan sagar
                    </Typography>
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "15px", paddingX: "1.0rem" }}>
                    Logout
                  </MenuItem>
                </Select>
              </FormControl>
            </Flexbetween>
          </Box>
        </Box>
      )}
    </Flexbetween>
  );
};

export default Navbar;
