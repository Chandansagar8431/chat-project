import { React, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Formlayout from "../Loginpage/Form";
const Loginpage = () => {
  const [inputs, setinputs] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleInputs = (e) => {
    setinputs([...inputs, ([e.target.name] = e.taget.value)]);
  };
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const def = theme.palette.background.default;
  return (
    <Box width="100%" height="100%" backgroundColor={alt}>
      <Box textAlign="center" padding="1rem 6%" backgroundColor={def}>
        <Typography
          fontSize="clamp(1.5rem,2rem,2.5rem)"
          fontWeight="bold"
          color="primary">
          Chat pedia
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "90%"}
        m="2rem auto"
        borderRadius="1.5rem"
        p="2rem"
        textAlign="center"
        backgroundColor={theme.palette.background.default}>
        <Typography
          marginBottom="1.5rem"
          fontWeight="500"
          variant="h5"
          color="primary"
          sx={{}}>
          welcome to chatapp
        </Typography>
        <Formlayout />
      </Box>
    </Box>
  );
};

export default Loginpage;
