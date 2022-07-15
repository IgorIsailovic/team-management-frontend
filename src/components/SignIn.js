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
import Modal from "@mui/material/Modal";
import Copyright from "./Copyright";
import ResponsiveDialog from "./ResponsiveDialog";

export default function SignIn({ url }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [validCredentials, setValidCredentials] = useState(true);
  const handleShowError = () => setValidCredentials(false);
  const handleColseError = () => setValidCredentials(true);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordNew2, setPasswordNew2] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //let token = localStorage.getItem("token");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }
  function validateForm2() {
    return (
      passwordOld.length > 0 &&
      passwordNew.length > 0 &&
      passwordNew2.length > 0 &&
      passwordNew === passwordNew2
    );
  }

  /*function handlePasswordUpdate() {
    axios
      .get(`http://localhost:8088/users/getByName/${username}`)
      .then(function (response) {
        axios
          .put(`http://localhost:8088/users/${response.id}`)
          .then(function (response) {
            alert("Uspešno promenjena lozinka");
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
*/
  function handleSubmit(event) {
    event.preventDefault();
    console.log(url);
    axios
      .post(`${url}/users/signin`, {
        username: username,
        password: password,
      })
      .then(function (response) {
        localStorage.setItem("token", response.data);
        let token = localStorage.getItem("token");
        console.log(response.data);
        let decoded = jwt_decode(token);
        let user = decoded.sub;
        let roles = decoded.roles[0].authority;
        let authority = decoded.authority;
        let iat = decoded.iat;
        let exp = decoded.exp;
        console.log(user);
        axios
          .get(`${url}/users/getByName/${user}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            setResult(response.data);
            console.log(`Response${response.data}`);
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
            console.log(result);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        error.response.status === 403
          ? handleShowError()
          : alert("Neka greska");
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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="passwordOld"
                label="Current password"
                name="passwordOld"
                autoComplete="passwordOld"
                autoFocus
                value={passwordOld}
                onChange={(e) => {
                  setPasswordOld(e.target.value);
                  handleColseError();
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordNew"
                label="New Password"
                type="passwordNew"
                id="passwordNew"
                autoComplete="passwordNew"
                value={passwordNew}
                onChange={(e) => {
                  setPasswordNew(e.target.value);
                  handleColseError();
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordNew2"
                label="New Password"
                type="passwordNew2"
                id="passwordNew2"
                autoComplete="passwordNew2"
                value={passwordNew2}
                onChange={(e) => {
                  setPasswordNew2(e.target.value);
                  handleColseError();
                }}
              />
              <Button
                type="primary"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!validateForm2()}
              >
                Sign In
              </Button>
            </Box>
          </Modal>
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
          {validCredentials === false ? (
            <Alert severity="error">
              <AlertTitle>Greška</AlertTitle>
              <strong>Neispravni username ili password!</strong>
            </Alert>
          ) : null}
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
