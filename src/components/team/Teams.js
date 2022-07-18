import React, { useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Team from "./Team";

export default function Teams({
  data,
  url,
  getUpdatedUserData,
  isLoading,
  backlog,
  selected,
  inprogress,
  finished,
  getAvatar,
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open, setOpen] = useState(false);
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
          <>
            <Team
              key={team.id}
              team={team}
              handleOpen={handleOpen}
              handleClose={handleClose}
              open={open}
              data={data}
              url={url}
              getUpdatedUserData={getUpdatedUserData}
              isLoading={isLoading}
              backlog={backlog}
              selected={selected}
              inprogress={inprogress}
              finished={finished}
              getAvatar={getAvatar}
            ></Team>
          </>
        ))
      ) : (
        <Typography
          variant="body1"
          fontFamily="Helvetica"
          color="inherit"
          align="center"
          fontWeight={700}
        >
          No teams available
        </Typography>
      )}
    </Box>
  );
}
