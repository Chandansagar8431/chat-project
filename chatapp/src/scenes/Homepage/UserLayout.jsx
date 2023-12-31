import React, { useEffect, useState } from "react";
import UserImage from "../../components/UserImage";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ManageAccountsOutlined,
  LocationCityOutlined,
  WorkHistoryOutlined,
  EditOutlined,
} from "@mui/icons-material";
import linkdin from "../../assets/linkedin.png";
import twitter from "../../assets/twitter.png";
import Flexbetween from "../../components/Flexbetween";

const UserLayout = ({ userId, picturePath }) => {
  const [userW, setuserW] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const getUesr = async () => {
    try {
      const res = await fetch(`http://localhost:5000/user/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      console.log(user);
      setuserW(user);
    } catch (error) {}
  };
  useEffect(() => {
    getUesr();
  }, []);
  return (
    <Box
      padding="1.5rem"
      display="flex"
      flexDirection="column"
      borderRadius="40px">
      <Box
        display="flex"
        flexDirection="row"
        gap="2.5rem"
        backgroundColor={theme.palette.background.default}
        padding="0.5rem"
        borderRadius="20px"
        onClick={() => navigate(`/profile/${userId}`)}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}>
        <UserImage picture={picturePath} />
        <Box flexGrow="5">
          <Typography
            fontWeight="500"
            fontSize="20px"
            paddingLeft="2rem"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              justifyContent: "space-between ",
              color: theme.palette.secondary.medium,
            }}>
            {userW.firstname} {userW.lastname}
            <ManageAccountsOutlined
              sx={{
                color: theme.palette.secondary.medium,
              }}
            />
          </Typography>
          <Box
            marginTop="12px"
            fontWeight="500"
            fontSize="1.0rem"
            paddingLeft="2rem"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              justifyContent: "space-between",
              color: theme.palette.secondary.medium,
            }}>
            <Typography
              fontWeight="500"
              fontSize="1.0rem"
              sx={{ color: theme.palette.secondary.medium }}>
              friends
            </Typography>
            <Typography sx={{ paddingRight: "5px" }}>
              {userW.friends ? user.friends.length : 0}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          margin: "10px 0",
          color: "black",
          size: "10px",
        }}
      />
      <Box display="flex" gap="20px" alignItems="center" paddingLeft="1rem">
        <LocationCityOutlined sx={{ color: theme.palette.secondary.medium }} />
        <Typography sx={{ color: theme.palette.secondary.medium }}>
          facke Location
        </Typography>
      </Box>
      <Box
        display="flex"
        gap="20px"
        alignItems="center"
        paddingLeft="1rem"
        marginTop="5px">
        <WorkHistoryOutlined sx={{ color: theme.palette.secondary.medium }} />
        <Typography sx={{ color: theme.palette.secondary.medium }}>
          facke worjhistory
        </Typography>
      </Box>
      <Divider sx={{ margin: "10px 0" }} />
      <Box
        display="flex"
        justifyContent="space-between"
        paddingLeft="1rem"
        marginBottom="10px">
        <Typography sx={{ color: theme.palette.secondary.medium }}>
          who viwed your profile
        </Typography>
        <Typography sx={{ color: theme.palette.secondary.medium }}>
          {user.viewdprofiles}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" paddingLeft="1rem">
        <Typography sx={{ color: theme.palette.secondary.medium }}>
          impressions of my posts
        </Typography>
        <Typography sx={{ color: theme.palette.secondary.medium }}>
          {user.impressions}
        </Typography>
      </Box>
      <Divider sx={{ margin: "10px 0" }} />
      <Box paddingLeft="1rem ">
        <Typography variant="h4" sx={{ color: theme.palette.secondary.medium }}>
          social profiles
        </Typography>
        <Flexbetween gap="10px">
          <Box display="flex" gap="20px" alignItems="center">
            <img
              src={linkdin}
              alt="linkdin"
              style={{
                color: theme.palette.secondary.medium,
                width: "15px",
                marginTop: "10px",
              }}
            />
            <Box marginTop="10px">
              <Typography sx={{ color: theme.palette.secondary.medium }}>
                Network platform
              </Typography>
            </Box>
          </Box>
          <EditOutlined sx={{ color: theme.palette.secondary.medium }} />
        </Flexbetween>
      </Box>

      <Flexbetween gap="10px" paddingLeft="1rem">
        <Box display="flex" gap="20px" alignItems="center">
          <img
            src={twitter}
            alt="twitter"
            style={{
              color: theme.palette.secondary.medium,
              width: "15px",
              marginTop: "10px",
            }}
          />
          <Box marginTop="10px">
            <Typography sx={{ color: theme.palette.secondary.medium }}>
              social platform
            </Typography>
          </Box>
        </Box>
        <EditOutlined sx={{ color: theme.palette.secondary.medium }} />
      </Flexbetween>
    </Box>
  );
};

export default UserLayout;
