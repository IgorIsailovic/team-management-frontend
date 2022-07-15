import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import jwt_decode from "jwt-decode";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SaveIcon from "@mui/icons-material/Save";
import Tooltip from "@mui/material/Tooltip";

export default function NewTask({
  open,
  handleClose,
  userData,
  getUpdatedUserData,
  url,
}) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [team, setTeam] = useState("");
  const [status, setStatus] = useState("");
  //const [assigner, setAssigner] = useState("");
  const [estDur, setEstDur] = useState("");
  const [assignies, setAssagnies] = useState([]);
  const [assignie, setAssagnie] = useState([]);

  const localHandleClose = () => {
    handleClose();
    setTaskName("");
    setTaskDescription("");
    setPriority("");
    setStatus("");
    setTeam("");
    setAssagnie("");
    setEstDur("");
  };
  useEffect(() => {
    getUsers();
  }, []);

  const localGetUpdatedUserData = () => getUpdatedUserData();

  const taskNameError = () => {
    return taskName.length < 1 || taskName.length > 55 ? true : false;
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    boxShadow: "1px 3px 10px  #9E9E9E",
    p: 2,
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto auto 3fr",
    overflow: "scroll",
    maxHeight: "80%",
    maxWidth: "50rem",
    minWidth: "20rem",
  };

  const getRole = () => {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    let roles = decoded.roles[0].authority;
    return roles;
  };

  const handlePriority = (event) => {
    setPriority(event.target.value);
  };
  const handleTeam = (event) => {
    setTeam(event.target.value);
  };
  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleAssagnie = (event) => {
    setAssagnie(event.target.value);
  };
  const getUsers = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${url}/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setAssagnies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /* function deleteTask() {
    let token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8088/tasks/${task.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log("task deleted");
      })
      .catch(function (error) {
        console.log(error);
      });
  }*/

  const addTask = () => {
    let token = localStorage.getItem("token");
    var axios = require("axios");
    var data = JSON.stringify({
      name: taskName,
      description: taskDescription,
      est_dur: estDur,
      status: status,
      priority: priority,
      assigner: userData.id,
      team: team,
    });

    var config1 = {
      method: "post",
      url: `${url}/tasks/addTask`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config1)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        axios
          .get(`${url}/users/addUserToTask/${assignie}/${response.data}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(function (response) {
            console.log(response);
            localGetUpdatedUserData();
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
    handleClose();
  };
  return (
    <Modal open={open} onClose={localHandleClose}>
      <Box sx={style} className="card-new">
        <Box
          className="new-card-header"
          sx={{ display: "grid", gridTemplateColumns: "7fr 1fr 1fr" }}
        >
          <Typography
            variant="body1"
            align="center"
            fontWeight={700}
            sx={{ alignSelf: "start", justifySelf: "start", m: 1 }}
          >
            New Task
          </Typography>
          {getRole() === "Admin" ? (
            <>
              <Tooltip title="Save">
                <IconButton
                  sx={{
                    alignSelf: "start",
                    justifySelf: "center",
                    color: "primary.main",
                  }}
                  onClick={addTask}
                >
                  <SaveIcon></SaveIcon>
                </IconButton>
              </Tooltip>
            </>
          ) : null}
          <Tooltip title="Close">
            <IconButton
              sx={{
                alignSelf: "start",
                justifySelf: "center",
                color: "primary.main",
                gridColumn: "3/-1",
              }}
              onClick={handleClose}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ m: 2 }}>
          <Box sx={{ m: 2, width: "100%" }}>
            <TextField
              autoComplete="task-name"
              name="taskName"
              required
              fullWidth
              id="taskName"
              label="Task Name"
              autoFocus
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              //error={taskNameError}
              //helperText={taskNameError?"Invalid size":""}
            />
          </Box>
          <Box sx={{ m: 2, width: "100%" }}>
            <TextField
              autoComplete="task-description"
              name="taskDescription"
              required
              fullWidth
              id="taskDescription"
              label="Task Description"
              autoFocus
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              inputProps={{ maxLength: 254 }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "grid", m: 2 }}>
          <Box sx={{ display: "grid", m: 1 }}>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                label="Priority"
                onChange={handlePriority}
              >
                <MenuItem value={0}>Low</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={2}>High</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "grid", m: 1 }}>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">Team</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={team}
                label="Team"
                onChange={handleTeam}
              >
                <MenuItem value={1}>Operations</MenuItem>
                <MenuItem value={2}>Admin</MenuItem>
                <MenuItem value={3}>Legal</MenuItem>
                <MenuItem value={4}>Development</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "grid", m: 1 }}>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleStatus}
              >
                <MenuItem value={0}>Backlog</MenuItem>
                <MenuItem value={1}>Selected</MenuItem>
                <MenuItem value={2}>In progress</MenuItem>
                <MenuItem value={3}>Finished</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "grid", m: 1 }}>
            <TextField
              autoComplete="est-dur"
              name="estDuration"
              required
              fullWidth
              id="estDuration"
              label="Estimated duration (h)"
              autoFocus
              value={estDur}
              onChange={(e) => setEstDur(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "grid", m: 1 }}>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">Assignies</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={assignie}
                label="Assignies"
                onChange={handleAssagnie}
              >
                {assignies.map((assignie) => (
                  <MenuItem key={assignie.id} value={assignie.id}>
                    {assignie.firstName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
