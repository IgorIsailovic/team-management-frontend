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
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
import Copyright from "./Copyright";
import ResponsiveDialog from "./ResponsiveDialog";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function SignIn({ url }) {
  const location = useLocation();
  const userName = location.state === null ? "" : location.state.username;
  const passwd = location.state === null ? "" : location.state.password;

  const [username, setUsername] = useState(userName);
  const [password, setPassword] = useState(passwd);
  const [validCredentials, setValidCredentials] = useState(true);
  const [loader, setLoader] = useState(false);
  const handleShowError = () => setValidCredentials(false);
  const handleColseError = () => setValidCredentials(true);
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function handleSubmit(event) {
    setLoader(true);
    event.preventDefault();
    //console.log(url);
    axios
      .post(`${url}/users/signin`, {
        username: username,
        password: password,
      })
      .then(function (response) {
        localStorage.setItem("token", response.data);
        let token = localStorage.getItem("token");
        // console.log(response.data);
        let decoded = jwt_decode(token);
        let user = decoded.sub;
        let roles = decoded.roles[0].authority;
        let authority = decoded.authority;
        let iat = decoded.iat;
        let exp = decoded.exp;
        //  console.log(user);
        axios
          .get(`${url}/users/getByName/${user}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            navigate("/mainPage", {
              state: {
                data: response.data,
                user: user,
                roles: roles,
                authority: authority,
                iat: iat,
                exp: exp,
              },
            });
            //  console.log(result);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        setLoader(false);
        error.response.status === 403 ? handleShowError() : alert("Error");
        console.log(error.response);
        console.log(error);
      });
  }

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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              handleColseError();
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleColseError();
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validateForm()}
          >
            Sign In
          </Button>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {validCredentials === false ? (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong> Wrong Username or Password!</strong>
              </Alert>
            ) : loader ? (
              <CircularProgress sx={{ alignSelf: "center" }} />
            ) : null}
          </Box>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={handleClickOpenDialog}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            <ResponsiveDialog
              open={openDialog}
              handleClose={handleCloseDialog}
            ></ResponsiveDialog>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
