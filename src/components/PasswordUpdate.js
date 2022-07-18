import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function PaswordUpdate({ data, url }) {
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordValid, setNewPasswordValid] = useState(true);

  const [newPassword2, setNewPassword2] = useState("");
  const [newPassword2Valid, setNewPassword2Valid] = useState(true);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function validateForm() {
    return (
      password.length > 0 &&
      newPassword.length > 0 &&
      newPassword2.length > 0 &&
      newPassword === newPassword2 &&
      passwordValid &&
      newPasswordValid &&
      newPassword2Valid
    );
  }

  const handlePasswordChange = (event) => {
    setPasswordValid(password.length > 3);
    setPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPasswordValid(password.length > 3);
    setNewPassword(event.target.value);
  };

  const handleNewPassword2Change = (event) => {
    setNewPassword2Valid(password.length > 3);
    setNewPassword2(event.target.value);
  };

  const resetFields = () => {
    setPassword("");
    setNewPassword("");
    setNewPassword2("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");

    var axios = require("axios");

    var config = {
      method: "put",
      url: `${url}/users/updatePassword/${data.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
        Cookie: "Cookie_1=value",
      },
      data: newPassword,
    };

    axios(config)
      .then(function (response) {
        handleClick();
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    resetFields();
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                error={!newPasswordValid}
                required={true}
                helperText={
                  !newPasswordValid
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
                value={newPassword2}
                onChange={handleNewPassword2Change}
                error={newPassword !== newPassword2}
                helperText={
                  newPassword !== newPassword2 ? "Passwords dont match " : " "
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
            Change Password
          </Button>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Password sucessfully updated
        </Alert>
      </Snackbar>
    </Container>
  );
}
