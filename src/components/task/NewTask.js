import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SaveIcon from "@mui/icons-material/Save";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

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
  const [teams, setTeams] = useState("");
  const [estDur, setEstDur] = useState("");
  const [assigniees, setAssigniees] = useState([]);
  const [assigniee, setAssigniee] = useState([]);

  const getAssignieesMembers = () => {
    if (team !== "") {
      let token = localStorage.getItem("token");
      axios
        .get(`${url}/users/getUsersForTeam/${team}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          //  console.log(response.data);
          setAssigniees(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const resetFields = () => {
    setTaskName("");
    setTaskDescription("");
    setPriority("");
    setStatus("");
    setTeam("");
    setEstDur("");
    setAssigniee([]);
  };
  const localHandleClose = () => {
    resetFields();
    handleClose();
  };

  useEffect(() => {
    getUsers();
    getTeams();
  }, []);

  useEffect(() => {
    getAssignieesMembers();
  }, [team]);

  const localGetUpdatedUserData = () => getUpdatedUserData();

  const fieldsEmty = () => {
    return taskName === "" ||
      taskDescription === "" ||
      priority === "" ||
      team === "" ||
      status === "" ||
      estDur === "" ||
      assigniee === ""
      ? true
      : false;
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

  const handlePriority = (event) => {
    setPriority(event.target.value);
  };
  const handleTeam = (event) => {
    setTeam(event.target.value);
  };
  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleAssigniee = (event) => {
    setAssigniee(event.target.value);
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
        setAssigniees(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getTeams = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${url}/teams/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setTeams(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addTask = () => {
    let token = localStorage.getItem("token");
    var axios = require("axios");
    var data = JSON.stringify({
      name: taskName,
      description: taskDescription,
      est_dur: estDur,
      status: status,
      priority: priority,
      reporter: userData.id,
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
        // console.log(JSON.stringify(response.data));
        for (const a of assigniee) {
          axios
            .get(`${url}/users/addUserToTask/${a}/${response.data}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(function (response) {
              // console.log(response);
              localGetUpdatedUserData();
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    localHandleClose();
  };
  return (
    <Modal open={open} onClose={localHandleClose}>
      <Box sx={style} className="card-new">
        <Box
          className="new-card-header"
          sx={{ display: "grid", gridTemplateColumns: "7fr  1fr" }}
        >
          <Typography
            variant="body1"
            align="center"
            fontWeight={700}
            sx={{ alignSelf: "start", justifySelf: "start", m: 1 }}
          >
            New Task
          </Typography>

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
          <Box sx={{ m: 1 }}>
            <TextField
              type={"text"}
              autoComplete="task-name"
              name="taskName"
              required
              fullWidth
              id="taskName"
              label="Task Name"
              autoFocus
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              inputProps={{ maxLength: 50 }}
            />
          </Box>
          <Box sx={{ m: 1 }}>
            <TextField
              type={"text"}
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
                required
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
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                required
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
              type={"number"}
              autoComplete="est-dur"
              name="estDuration"
              required
              fullWidth
              id="estDuration"
              label="Estimated duration (h)"
              autoFocus
              value={estDur}
              onChange={(e) => setEstDur(e.target.value.toString().slice(0, 3))}
            />
          </Box>
          <Box sx={{ display: "grid", m: 1 }}>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">Team</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={team}
                label="Team"
                onChange={handleTeam}
              >
                {teams.length > 0 ? (
                  teams.map((team) => (
                    <MenuItem key={team.id} value={team.id}>
                      {team.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={null}>""</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
          {team === "" ? null : (
            <Box sx={{ display: "grid", m: 1 }}>
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">
                  Assigniees
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={assigniee}
                  label="Assigniees"
                  multiple
                  onChange={handleAssigniee}
                >
                  {assigniees.map((assigniee) => (
                    <MenuItem key={assigniee.id} value={assigniee.id}>
                      {assigniee.firstName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
          <Box sx={{ mt: 3, display: "grid" }}>
            <Button
              disabled={fieldsEmty()}
              variant="outlined"
              onClick={addTask}
              startIcon={<SaveIcon />}
            >
              Save Task
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
