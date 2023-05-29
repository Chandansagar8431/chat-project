import React from "react";
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
const Navbar = ({ mode, handlemode }) => {
  const [name, setname] = useState("chandan sagar");

  const [toggleMobileMenu, settoggleMobileMenu] = useState(false);
  const isNonMobilescreen = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const navigate = useNavigate();
  const primary = theme.palette.primary;
  const alt = theme.palette.background.alt;
  const background = theme.palette.background.default;
  const dark = theme.palette.secondary.dark;
  const medium = theme.palette.secondary.medium;
  const light = theme.palette.primary.light;
  const neutrallight = theme.palette.secondary.light;
  return (
    <Flexbetween padding="1rem 6%" backgroundColor={alt} margin="0">
      <Flexbetween gap="2rem">
        <Typography
          fontSize="clamp(1rem,2rem,2.5rem)"
          fontweight="bold"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{ "&:hover": { cursor: "pointer" } }}>
          Sociopedia
        </Typography>
        {isNonMobilescreen && (
          <Flexbetween
            backgroundColor={light}
            paddingX="0.5rem"
            borderRadius="5px">
            <InputBase placeholder="search..." sx={{ fontSize: "20px" }} />
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
                <Typography sx={{ fontSize: "15px" }}>chandan sagar</Typography>
              </MenuItem>
              <MenuItem sx={{ fontSize: "15px", paddingX: "1.0rem" }}>
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
