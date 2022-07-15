import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function Teams({ data }) {
  const clicked = () => {
    console.log("clicked");
  };
  return (
    <Box
      sx={{
        display: "grid",
        alignSelf: "start",
        justifySelf: "center",
        width: "100%",
        //marginTop: "1rem",
        // maxWidth: "100rem",
        //marginBottom: "2rem",
        //minWidth: "17rem",
        //gridColumn: "1 / -1",
      }}
    >
      {data.teamUser.length > 0 ? (
        data.teamUser.map((team) => (
          <IconButton
            key={team.id}
            onClick={clicked}
            sx={{
              borderRadius: "0rem",
              boxShadow: "1px 3px 10px  #9E9E9E",
              backgroundColor: "white",
              width: "100%",
              marginBottom: "1rem",
              padding: "1.5rem",
              //gridColumn: "span 2",
              //gridRow: "auto",
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
              color="primary.main"
              align="center"
              fontWeight={700}
              sx={{ alignSelf: "center", justifySelf: "center" }}
            >
              {team.name}
            </Typography>
          </IconButton>
        ))
      ) : (
        <Typography
          variant="body1"
          fontFamily="Helvetica"
          color="inherit"
          align="center"
          fontWeight={700}
        >
          Niste ni u jednom timu
        </Typography>
      )}
    </Box>
  );
}
