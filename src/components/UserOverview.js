import React from "react";
import Box from "@mui/material/Box";
import UserInfo from "./UserInfo";
import Teams from "./Teams";
import TaskOverview from "./TaskOverview";
import { Typography } from "@mui/material";
import "../styles/Shared.css";

export default function UserOverview({
  data,
  getUpdatedUserData,
  isLoading,
  backlog,
  selected,
  inprogress,
  finished,
}) {
  return (
    <Box
      className="overview-box"
      sx={{
        display: "grid",
        gridGap: "1rem",
        width: "100%",
      }}
    >
      <UserInfo data={data}></UserInfo>

      <Box
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          display: "grid",
          boxShadow: "1px 3px 10px  #9E9E9E",
          height: "100%",
          width: "100%",
          //maxWidth: "60rem",
          padding: "1rem",
          //margin: "1rem",
          //borderRadius: "3rem",
          backgroundColor: "white",
          //gridColumn: "1 / -1",
          gridTemplateColumns: "repeat(1, 1fr)",
          //gridGap: "1rem",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          align="center"
          sx={{ mb: 2, gridColumn: "1 / -1", alignSelf: "center" }}
        >
          Teams
        </Typography>
        <Teams data={data}></Teams>
      </Box>
      <TaskOverview
        data={data}
        getUpdatedUserData={getUpdatedUserData}
        isLoading={isLoading}
        backlog={backlog}
        selected={selected}
        inprogress={inprogress}
        finished={finished}
      ></TaskOverview>
    </Box>
  );
}
