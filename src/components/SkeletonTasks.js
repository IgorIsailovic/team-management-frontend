import React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonTasks() {
  return (
    <>
      <Skeleton
        variant="text"
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          cursor: "pointer",
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
      />
      <Skeleton
        variant="text"
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          cursor: "pointer",
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
      />
      <Skeleton
        variant="text"
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          cursor: "pointer",
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
      />
    </>
  );
}
