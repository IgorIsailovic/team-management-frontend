import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Task from "./Task";
import Box from "@mui/material/Box";
import "../styles/Shared.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NewTask from "./NewTask";
import jwt_decode from "jwt-decode";
import SkeletonTasks from "./SkeletonTasks";

export default function Tasks({
  data,
  url,
  getUpdatedUserData,
  isLoading,
  backlog,
  selected,
  inprogress,
  finished,
}) {
  const handleOpenNew = () => setOpenNew(true);
  const handleCloseNew = () => setOpenNew(false);

  const [openNew, setOpenNew] = useState(false);

  const getRole = () => {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    let roles = decoded.roles[0].authority;
    return roles;
  };

  const taskStatus = (status, name) => {
    return (
      <Box
        sx={{
          display: "grid",
          gridGap: "1rem",
          alignSelf: "start",
          justifySelf: "center",
          width: "100%",
          height: "100%",
          background: "#F1F1F1",
          padding: "1rem",
          minHeight: "14rem",
          gridAutoRows: "min-content",
        }}
      >
        {isLoading ? (
          <SkeletonTasks />
        ) : (
          <>
            <Typography
              variant="h5"
              component="h2"
              fontWeight={700}
              align="center"
              sx={{ mt: 2 }}
            >
              {name}
            </Typography>
            {status.map((task) => (
              <Task
                task={task}
                key={task.id}
                getUpdatedUserData={getUpdatedUserData}
                url={url}
              ></Task>
            ))}
          </>
        )}
      </Box>
    );
  };

  return (
    <Box
      className="tasks"
      sx={{
        display: "grid",
        width: "100%",
        height: "100%",
        gridGap: "1rem",
        alignSelf: "center",
        justifySelf: "center",
        gridColumn: "1 / -1",
      }}
    >
      {getRole() === "Admin" ? (
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 50, right: 50 }}
          onClick={handleOpenNew}
        >
          <AddIcon />
        </Fab>
      ) : null}
      <NewTask
        open={openNew}
        handleClose={handleCloseNew}
        userData={data}
        getUpdatedUserData={getUpdatedUserData}
        url={url}
      ></NewTask>
      {backlog.length > 0 ||
      selected.length > 0 ||
      inprogress.length > 0 ||
      finished.length > 0 ? (
        <>
          {taskStatus(backlog, "Backlog")}
          {taskStatus(selected, "Selected")}
          {taskStatus(inprogress, "In progress")}
          {taskStatus(finished, "Finished")}
        </>
      ) : (
        <Typography
          sx={{
            alignSelf: "center",
            justifySelf: "center",
          }}
          variant="body1"
          fontFamily="Helvetica"
          color="inherit"
          align="center"
          fontWeight={700}
        >
          Trenutno nema podataka o taskovima
        </Typography>
      )}
    </Box>
  );
}
