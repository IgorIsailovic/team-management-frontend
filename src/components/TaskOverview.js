import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import SkeletonTasksOverview from "./SkeletonTaskOverview";

export default function TaskOverview({
  data,
  getUpdatedUserData,
  isLoading,
  backlog,
  selected,
  inprogress,
  finished,
}) {
  useEffect(() => {
    getUpdatedUserData();
  }, []);

  return isLoading ? (
    <SkeletonTasksOverview />
  ) : (
    <Box
      sx={{
        alignSelf: "center",
        justifySelf: "center",
        display: "grid",
        boxShadow: "1px 3px 10px  #9E9E9E",
        height: "100%",
        width: "100%",
        padding: "1rem",
        minHeight: "16rem",
        backgroundColor: "white",
        gridColumn: "1 / -1",
        gridTemplateColumns: "repeat(4, 1fr)",
        //gridGap: "0rem",
      }}
    >
      <Box
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          display: "grid",

          //maxWidth: "60rem",
          //minHeight: "8rem",
          padding: "1rem",
          backgroundColor: "white",
          gridColumn: "1 / -1",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          fontWeight={700}
          align="center"
          sx={{
            alignSelf: "center",
            justifySelf: "center",
          }}
        >
          Tasks Overview
        </Typography>
      </Box>
      <Box
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          display: "grid",
          boxShadow: "1px 3px 10px  #9E9E9E",
          height: "90%",
          width: "90%",
          //maxWidth: "60rem",
          padding: "1rem",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h7"
          fontFamily="Helvetica"
          color="inherit"
          fontWeight={600}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "start",
          }}
        >
          Backlog
        </Typography>
        <Typography
          variant="h5"
          fontFamily="fantasy"
          color="inherit"
          fontWeight={300}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "center",
          }}
        >
          {backlog.length}
        </Typography>
      </Box>
      <Box
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          display: "grid",
          boxShadow: "1px 3px 10px  #9E9E9E",
          height: "90%",
          width: "90%",
          //maxWidth: "60rem",
          padding: "1rem",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h7"
          fontFamily="Helvetica"
          color="inherit"
          fontWeight={600}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "start",
          }}
        >
          Selected
        </Typography>
        <Typography
          variant="h5"
          fontFamily="fantasy"
          color="inherit"
          fontWeight={300}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "center",
          }}
        >
          {selected.length}
        </Typography>
      </Box>
      <Box
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          display: "grid",
          boxShadow: "1px 3px 10px  #9E9E9E",
          height: "90%",
          width: "90%",
          //maxWidth: "60rem",
          padding: "1rem",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h7"
          fontFamily="Helvetica"
          color="inherit"
          fontWeight={600}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "start",
          }}
        >
          In Progress
        </Typography>
        <Typography
          variant="h5"
          fontFamily="fantasy"
          color="inherit"
          fontWeight={300}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "center",
          }}
        >
          {inprogress.length}
        </Typography>
      </Box>
      <Box
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          display: "grid",
          boxShadow: "1px 3px 10px  #9E9E9E",
          height: "90%",
          width: "90%",
          //maxWidth: "60rem",
          padding: "1rem",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h7"
          fontFamily="Helvetica"
          color="inherit"
          fontWeight={600}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "start",
          }}
        >
          Finished
        </Typography>
        <Typography
          variant="h5"
          fontFamily="fantasy"
          color="inherit"
          fontWeight={300}
          align="center"
          sx={{
            justifySelf: "center",
            width: "100%",
            alignSelf: "center",
          }}
        >
          {finished.length}
        </Typography>
      </Box>
    </Box>
  );
}
