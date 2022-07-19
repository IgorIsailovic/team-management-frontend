import React, { useState, useEffect } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import { IconButton, Typography } from "@mui/material";
import axios from "axios";
import TeamModal from "./TeamModal";

export default function Team({ team, data, url, getAvatar, getRole }) {
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [open, setOpen] = useState(false);
  const [localBacklog, setLocalBacklog] = useState("");
  const [localSelected, setLocalSelected] = useState("");
  const [localInprogress, setLocalInprogress] = useState("");
  const [localFinished, setLocalFinished] = useState("");
  const [localIsLoading, setLocalIsLoading] = useState(true);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    localGetUpdatedUserData();
    getTeamMembers();
  }, [open]);

  const localGetUpdatedUserData = () => {
    let token = localStorage.getItem("token");
    //  console.log(`Team ID: ${team.id}`);
    axios
      .get(`${url}/tasks/getTasksForTeam/${team.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //console.log(response.data);
        setLocalBacklog(
          response.data.filter((task) => task.status === "BACKLOG")
        );
        setLocalSelected(
          response.data.filter((task) => task.status === "SELECTED")
        );
        setLocalInprogress(
          response.data.filter((task) => task.status === "INPROGRESS")
        );
        setLocalFinished(
          response.data.filter((task) => task.status === "FINISHED")
        );
        setLocalIsLoading(false);

        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getTeamMembers = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${url}/users/getUsersForTeam/${team.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setMembers(response.data);
        setLocalIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <IconButton
        key={team.id}
        onClick={handleOpen}
        sx={{
          borderRadius: "0rem",
          boxShadow: "1px 3px 10px  #9E9E9E",
          backgroundColor: "white",
          width: "100%",
          marginBottom: "1rem",
          padding: "1.5rem",
          color: "black",
          justifySelf: "center",
          alignSelf: "center",
        }}
      >
        <GroupsIcon sx={{ margin: "0.5rem" }}></GroupsIcon>
        <Typography
          key={team.id}
          variant="body1"
          fontFamily="Helvetica"
          color="inherit"
          align="center"
          fontWeight={700}
          sx={{ alignSelf: "center", justifySelf: "center" }}
        >
          {team.name}
        </Typography>
      </IconButton>
      <TeamModal
        team={team}
        open={open}
        handleClose={handleClose}
        data={data}
        url={url}
        localGetUpdatedUserData={localGetUpdatedUserData}
        members={members}
        localIsLoading={localIsLoading}
        localBacklog={localBacklog}
        localSelected={localSelected}
        localInprogress={localInprogress}
        localFinished={localFinished}
        getAvatar={getAvatar}
        getRole={getRole}
        getTeamMembers={getTeamMembers}
      ></TeamModal>
    </>
  );
}
