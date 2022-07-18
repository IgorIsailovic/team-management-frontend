import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "./Copyright";
import { useNavigate } from "react-router-dom";

export default function SignUp({ url }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const navigate = useNavigate();
  //const [result, setResult] = useState("");

  const axios = require("axios");
  let data = JSON.stringify({
    username: username,
    password: password,
    email: email,
    firstName: firstname,
    lastName: lastname,
  });

  let config = {
    method: "post",
    url: `${url}/users/signup`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  function validateForm() {
    return (
      username.length > 0 &&
      password.length > 0 &&
      firstname.length > 0 &&
      lastname.length > 0 &&
      password === passwordCheck &&
      passwordValid &&
      emailValid
    );
  }

  const handleEmailChange = (event) => {
    const reg = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    setEmailValid(reg.test(event.target.value));
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValid(password.length > 3);
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axios(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        navigate("/signIn", {
          state: {
            username: username,
            password: password,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                error={!emailValid}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={handlePasswordChange}
                error={!passwordValid}
                required={true}
                helperText={
                  !passwordValid
                    ? "Passwords must be at least 4 characters "
                    : " "
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordCheck"
                label="Password Check"
                type="password"
                id="passwordCheck"
                autoComplete="new-password"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                error={password !== passwordCheck}
                helperText={
                  password !== passwordCheck ? "Passwords dont match " : " "
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validateForm()}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
