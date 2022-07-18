import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import Tasks from "../task/Tasks";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import AvatarGroup from "@mui/material/AvatarGroup";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function TeamModal({
  team,
  open,
  handleClose,
  data,
  url,
  getAvatar,
  localGetUpdatedUserData,
  members,
  localIsLoading,
  localBacklog,
  localSelected,
  localInprogress,
  localFinished,
  getTeamMembers,
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
    let token = localStorage.getItem("token");

    var axios = require("axios");

    var config = {
      method: "get",
      url: `${url}/users/5/1`,
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
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box
          className="modal-header"
          sx={{ display: "grid", gridTemplateColumns: "7fr 1fr 1fr 1fr" }}
        >
          <Typography
            variant="body1"
            align="center"
            fontWeight={700}
            sx={{ alignSelf: "start", justifySelf: "start", m: 1 }}
          >
            Team ID: {team.id}
          </Typography>

          <Tooltip title="Close">
            <IconButton
              sx={{
                alignSelf: "start",
                justifySelf: "center",
                color: "primary.main",
                gridColumn: "4/-1",
              }}
              onClick={handleClose}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ m: 2 }}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight={700}
            align="center"
            sx={{ mb: 3 }}
          >
            {team.name}
          </Typography>
        </Box>
        <Box>
          <Tasks
            data={data}
            url={url}
            getUpdatedUserData={localGetUpdatedUserData}
            isLoading={localIsLoading}
            backlog={localBacklog}
            selected={localSelected}
            inprogress={localInprogress}
            finished={localFinished}
            inTeams={true}
            userOnly={true}
          ></Tasks>
        </Box>
        <Box sx={{ display: "grid", m: 1 }}>
          <Typography
            variant="h6"
            fontWeight={600}
            align="center"
            sx={{ m: 1 }}
          >
            Members
          </Typography>
          <Box sx={{ display: "grid", m: 1, gridTemplateColumns: "auto auto" }}>
            <AvatarGroup
              max={4}
              sx={{
                justifySelf: "end",
                m: 1,
              }}
            >
              {members.map((member) => {
                return (
                  <Tooltip key={member.id} title={member.firstName}>
                    <Avatar
                      key={member.id}
                      alt={member.firstName + member.lastName}
                      src={getAvatar(member.username)}
                    />
                  </Tooltip>
                );
              })}
            </AvatarGroup>

            <Fab
              color="primary"
              aria-label="add"
              size="small"
              sx={{ alignSelf: "center" }}
              onClick={addTemMember}
            >
              <Tooltip title="Add members">
                <AddIcon />
              </Tooltip>
            </Fab>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
