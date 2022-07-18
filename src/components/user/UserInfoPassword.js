import React from "react";
import UserInfo from "./UserInfo";
import Box from "@mui/material/Box";
import PasswordUpdate from "../PasswordUpdate";

export default function UserInfoPassword({ data, url }) {
  return (
    <Box
      className="user-info-password"
      sx={{ display: "grid", gridTemplateColumns: "1fr" }}
    >
      <UserInfo data={data}></UserInfo>
      <PasswordUpdate data={data} url={url}></PasswordUpdate>
    </Box>
  );
}
