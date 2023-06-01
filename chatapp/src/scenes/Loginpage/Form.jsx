import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { setLogin } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialRegisterValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picturepath: "",
};

const initialLoginValues = { email: "", password: "" };
const registerSchema = yup.object().shape({
  firstname: yup.string().required("firstname is required"),
  lastname: yup.string().required("lastname is required"),
  email: yup.string().email("invalid email").required("email is required"),
  password: yup.string().required("password is require"),
  location: yup.string().required("location is required"),
  occupation: yup.string().required("occupation is required"),
  picturepath: yup.string().required("picture is required"),
});
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("email is required"),
  password: yup.string().required("password is require"),
});
const Form = () => {
  const [pageType, setpageType] = useState("register");
  const isLogin = pageType === "login";
  const isRegiser = pageType === "register";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegiser) await register(values, onSubmitProps);
  };

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturepath", values.picturepath.name);

    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      body: formData,
    });

    const userRegistered = await response.json();
    console.log(userRegistered);
    if (userRegistered) {
      onSubmitProps.resetForm();
      setpageType("login");
    }
  };
  const login = async (values, onSubmitProps) => {
    try {
      const cred = { email: values.email, password: values.password };
      const loggeduser = await axios.post(
        "http://localhost:5000/auth/login",
        cred
      );

      if (loggeduser) {
        dispatch(setLogin({ user: loggeduser.user, token: loggeduser.token }));
        navigate("/home");
        onSubmitProps.resetForm();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialLoginValues : initialRegisterValues}
        validationSchema={isLogin ? loginSchema : registerSchema}>
        {({
          values,
          errors,
          handleSubmit,
          handleChange,
          handleBlur,
          touched,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gridTemplateColumns="repeat(4,minmax(0,1fr))"
              sx={{
                "&>div": {
                  gridColumn: isNonMobileScreens ? undefined : "span 4",
                  mb: "1rem",
                },
              }}>
              {isRegiser && (
                <>
                  <TextField
                    label="first name"
                    value={values.firstname}
                    name="firstname"
                    error={
                      Boolean(touched.firstname) && Boolean(errors.firstname)
                    }
                    helperText={touched.firstname && errors.firstname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ gridColumn: "span 2", mr: "1rem" }}
                  />
                  <TextField
                    label="last name"
                    value={values.lastname}
                    name="lastname"
                    error={
                      Boolean(touched.lastname) && Boolean(errors.lastname)
                    }
                    helperText={touched.lastname && errors.lastname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="occupation"
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="location"
                    value={values.location}
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box gridCloumn="span 4" sx={{ gridColumn: "span 4" }}>
                    <Dropzone
                      acceptedFiles=".jpeg,.jpg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picturepath", acceptedFiles[0])
                      }>
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`1px dashed ${theme.palette.primary.main}`}
                          borderRadius="10px"
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}>
                          <input {...getInputProps()} />
                          {!values.picturepath ? (
                            <Typography color="white">
                              add image here
                            </Typography>
                          ) : (
                            <Box display="flex" justifyContent="space-between">
                              <Typography color="grey">
                                {values.picturepath.name}
                              </Typography>
                              <EditIcon sx={{ color: "grey" }} />
                            </Box>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}
              <TextField
                label="email"
                value={values.email}
                onChange={handleChange}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="password"
                value={values.password}
                type="password"
                name="password"
                onChange={handleChange}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <Box
                display="flex"
                gap="20px"
                justifyContent="space-around"
                alignItems="center"
                sx={{ gridColumn: "span 4" }}>
                <Button
                  type="submit"
                  variant="solid"
                  color="primary"
                  zindex="7"
                  sx={{
                    width: "300px",
                    fontWeight: "100",
                    fontSize: "20px",

                    zindex: "7",
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.alt,
                    "&:hover": { color: "white" },
                  }}>
                  {isLogin ? "log in" : "sign in"}
                </Button>
                <Typography
                  color="primary"
                  onClick={() => {
                    setpageType(isLogin ? "register" : "login");
                    resetForm();
                  }}
                  sx={{
                    textDecoration: "underline",
                    "&:hover": { cursor: "pointer" },
                  }}>
                  {isLogin
                    ? " Don't have account do sign in here"
                    : "already have an account"}
                </Typography>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Form;
