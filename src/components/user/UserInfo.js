import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import "../../styles/UserPage.css";
import igor from "../../images/igor.png";
import max from "../../images/max.jpg";
import lynda from "../../images/lynda.jpg";
import melinda from "../../images/melinda.jpg";
import marta from "../../images/marta.jpg";
import jim from "../../images/jim.jpg";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttributionIcon from "@mui/icons-material/Attribution";

export default function UserInfo({ data }) {
  const getAvatar = (user) => {
    switch (user) {
      case "igor":
        return igor;
      case "max":
        return max;
      case "lynda":
        return lynda;
      case "melinda":
        return melinda;
      case "marta":
        return marta;
      case "jim":
        return jim;
      default:
        return null;
    }
  };
  return (
    <Box sx={{ display: "grid" }}>
      <Box
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          display: "grid",
          boxShadow: "1px 3px 10px  #9E9E9E",
          height: "100%",
          width: "100%",
          maxWidth: "50rem",
          padding: "2rem",
          //borderRadius: "3rem",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            marginBottom: "2rem",
          }}
        >
          <Avatar
            alt={data.firstName.charAt(0) + data.lastName.charAt(0)}
            src={getAvatar(data.username)}
            sx={{
              color: "black",
              bgcolor: "white",
              justifySelf: "center",
              alignSelf: "center",
              height: "9rem",
              width: "9rem",
            }}
          ></Avatar>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 9fr",
            margin: "1rem",
            gridGap: "1rem",
          }}
        >
          <AccountCircleIcon
            sx={{ alignSelf: "start", justifySelf: "center", color: "black" }}
          ></AccountCircleIcon>
          <Typography
            variant="body1"
            fontFamily="Helvetica"
            color="inherit"
            align="center"
            fontWeight={700}
            sx={{ alignSelf: "start", justifySelf: "start" }}
          >
            {data.firstName} {data.lastName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 9fr",
            margin: "1rem",
            gridGap: "1rem",
          }}
        >
          <AlternateEmailIcon
            sx={{ alignSelf: "start", justifySelf: "center", color: "black" }}
          ></AlternateEmailIcon>
          <Typography
            variant="body1"
            fontFamily="Helvetica"
            color="inherit"
            align="center"
            fontWeight={700}
            sx={{ alignSelf: "start", justifySelf: "start" }}
          >
            {data.email}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 9fr",
            margin: "1rem",
            gridGap: "1rem",
          }}
        >
          <AttributionIcon
            sx={{ alignSelf: "start", justifySelf: "center", color: "black" }}
          ></AttributionIcon>
          <Typography
            variant="body1"
            fontFamily="Helvetica"
            color="inherit"
            align="center"
            fontWeight={700}
            sx={{ alignSelf: "start", justifySelf: "start" }}
          >
            {data.roles.map((role, key) => role.roleName)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
