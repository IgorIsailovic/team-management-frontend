import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

export default function SkeletonTasksOverview() {
  return (
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
      <Skeleton
        variant="text"
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          width: "100%",
          height: "100%",
          gridColumn: "1 / -1",
        }}
      ></Skeleton>
      <Skeleton
        variant="text"
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          width: "90%",
          height: "100%",
        }}
      ></Skeleton>
      <Skeleton
        variant="text"
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          width: "90%",
          height: "100%",
        }}
      ></Skeleton>
      <Skeleton
        variant="text"
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          width: "90%",
          height: "100%",
        }}
      ></Skeleton>
      <Skeleton
        variant="text"
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          width: "90%",
          height: "100%",
        }}
      ></Skeleton>
    </Box>
  );
}
