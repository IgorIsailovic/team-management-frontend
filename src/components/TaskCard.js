import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Tooltip from "@mui/material/Tooltip";

export default function TaskCard({
  task,
  cardClick,
  getAssagnies,
  assagnies,
  getAvatar,
}) {
  useEffect(() => {
    getAssagnies();
  }, []);

  return (
    <Card
      //variant="outlined"
      onClick={cardClick}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        cursor: "pointer",
        backgroundColor: "white",
        padding: "15px 15px 15px 15px",
        //margin: "5px",
        width: "100%",
        textAlign: "center",
        borderRadius: "0rem",
        minWidth: "280px",
        //maxWidth: "50rem",
        height: "8rem",
        minHeight: "8rem",
        gridGap: "1rem",
        boxShadow: "1px 3px 10px  #9E9E9E",
      }}
    >
      <Typography
        variant="body1"
        fontFamily="Helvetica"
        color="inherit"
        align="left"
        fontWeight={700}
        sx={{
          gridColumn: "1/-1",
          alignSelf: "center",
          justifySelf: "start",
        }}
      >
        {task.name}
      </Typography>
      <Box
        sx={{
          alignSelf: "center",
          justifySelf: "start",
        }}
      >
        {task.priority === "HIGH" ? (
          <ArrowUpwardIcon
            style={{
              color: "red",
              alignSelf: "center",
              justifySelf: "center",
              m: 1,
            }}
          />
        ) : task.priority === "LOW" ? (
          <ArrowDownwardIcon
            style={{
              color: "green",
              alignSelf: "center",
              justifySelf: "center",
              m: 1,
            }}
          />
        ) : (
          <ArrowForwardIcon
            style={{
              color: "orange",
              alignSelf: "center",
              justifySelf: "center",
              m: 1,
            }}
          />
        )}
      </Box>
      <Box>
        <AvatarGroup
          max={4}
          sx={{
            justifySelf: "center",
            m: 1,
            "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 15 },
          }}
        >
          {assagnies.map((assignee) => {
            return (
              <Tooltip key={assignee.id} title={assignee.firstName}>
                <Avatar
                  key={assignee.id}
                  alt={assignee.firstName + assignee.lastName}
                  src={getAvatar(assignee.username)}
                />
              </Tooltip>
            );
          })}
        </AvatarGroup>
      </Box>
    </Card>
  );
}
