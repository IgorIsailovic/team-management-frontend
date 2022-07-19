import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export default function UserSelectModal({
  url,
  users,
  user,
  handleUser,
  open,
  handleClose,
  getTeamMembers,
  team,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    //width: "100%",
    bgcolor: "background.paper",
    boxShadow: "1px 3px 10px  #9E9E9E",
    p: 2,
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto auto auto auto",
    overflow: "scroll",
    maxWidth: "100%",
    maxHeight: "85%",
    //maxWidth: "50rem",
    minWidth: "20rem",
  };

  const addTemMember = () => {
    console.log(team.id);
    console.log(user);
    let token = localStorage.getItem("token");

    var axios = require("axios");

    var config = {
      method: "get",
      url: `${url}/users/${user}/${team.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        getTeamMembers();
      })
      .catch(function (error) {
        console.log(error);
      });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box className="modal-header" sx={{ display: "grid" }}>
          <Box sx={{ display: "grid", m: 1 }}>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">Users</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user}
                label="Assigniees"
                onChange={handleUser}
              >
                {users.map((us) => (
                  <MenuItem key={us.id} value={us.id}>
                    {`${us.firstName} ${us.lastName}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{ mt: 3, display: "grid", width: "50%", justifySelf: "center" }}
          >
            <Button
              disabled={user.length === 0}
              variant="outlined"
              onClick={addTemMember}
              //startIcon={<SaveIcon />}
            >
              Add Member
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
