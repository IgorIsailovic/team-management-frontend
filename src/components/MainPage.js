import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import { useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import igor from "../images/igor.png";
import max from "../images/max.jpg";
import lynda from "../images/lynda.jpg";
import melinda from "../images/melinda.jpg";
import marta from "../images/marta.jpg";
import jim from "../images/jim.jpg";
import Tasks from "./task/Tasks";
import Teams from "./team/Teams";
import UserInfoPassword from "./user/UserInfoPassword";
import UserOverview from "./user/UserOverview";
import GroupsIcon from "@mui/icons-material/Groups";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import axios from "axios";
import Copyright from "./Copyright";

const drawerWidth = 240;

export default function MainPage({ url }) {
  //let token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);
  const [view, setView] = useState("user");
  const [drawer, setDrawer] = useState(null);
  const [margin, setMargin] = useState(null);
  const [backlog, setBacklog] = useState("");
  const [selected, setSelected] = useState("");
  const [inprogress, setInprogress] = useState("");
  const [finished, setFinished] = useState("");
  const [isLoading, setLoading] = useState(true);

  //const navigate = useNavigate();
  const getRole = () => {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    let roles = decoded.roles[0].authority;
    return roles;
  };

  const getUpdatedUserData = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${url}/users/getByName/${data.username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // setData(response.data);
        setBacklog(
          response.data.taskUser.filter((task) => task.status === "BACKLOG")
        );
        setSelected(
          response.data.taskUser.filter((task) => task.status === "SELECTED")
        );
        setInprogress(
          response.data.taskUser.filter((task) => task.status === "INPROGRESS")
        );
        setFinished(
          response.data.taskUser.filter((task) => task.status === "FINISHED")
        );
        setLoading(false);

        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const location = useLocation();
  const data = location.state.data;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  /*const handleChange = (event) => {
    setAuth(event.target.checked);
  };*/

  const handleMenu = (event) => {
    if (open) setOpen(false);
    setView("userInfo");
  };

  const handleClickView = (pageView) => {
    setView(pageView);
    setOpen(!open);
  };

  useEffect(() => {
    function closeDrawer() {
      if (window.innerWidth < 928 && open) {
        handleDrawerClose();
        setDrawer(false);
        setMargin(`-${drawerWidth}px`);
      }
      if (window.innerWidth > 928) {
        handleDrawerOpen();
        setDrawer(true);
        setMargin(0);
      }
    }
    window.addEventListener("resize", closeDrawer);
  });

  useEffect(() => {
    function closeDrawer() {
      if (window.innerWidth > 928) {
        handleDrawerOpen();
        setDrawer(true);
        setMargin(0);
      } else setMargin(`-${drawerWidth}px`);
    }
    closeDrawer();
  }, []);

  const getView = (view) => {
    switch (view) {
      case "user":
        return (
          <UserOverview
            data={data}
            getUpdatedUserData={getUpdatedUserData}
            isLoading={isLoading}
            backlog={backlog}
            selected={selected}
            inprogress={inprogress}
            finished={finished}
            url={url}
            getAvatar={getAvatar}
            getRole={getRole}
          ></UserOverview>
        );
      case "teams":
        return (
          <Teams
            data={data}
            url={url}
            getAvatar={getAvatar}
            getRole={getRole}
          ></Teams>
        );
      case "tasks":
        return (
          <Tasks
            data={data}
            url={url}
            getUpdatedUserData={getUpdatedUserData}
            isLoading={isLoading}
            backlog={backlog}
            selected={selected}
            inprogress={inprogress}
            finished={finished}
            inTeams={false}
          ></Tasks>
        );
      case "userInfo":
        return (
          <UserInfoPassword
            data={data}
            url={url}
            getUpdatedUserData={getUpdatedUserData}
            isLoading={isLoading}
            backlog={backlog}
            selected={selected}
            inprogress={inprogress}
            finished={finished}
            getAvatar={getAvatar}
            getRole={getRole}
          ></UserInfoPassword>
        );
      default:
        return null;
    }
  };
  const getTitle = (view) => {
    switch (view) {
      case "user":
        return `${data.firstName}'s Dashboard`;
      case "teams":
        return ` ${data.firstName}'s Teams`;
      case "tasks":
        return ` ${data.firstName}'s Tasks`;
      case "userInfo":
        return ` ${data.firstName}'s Info`;
      default:
        return null;
    }
  };
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

  const logOut = () => {
    localStorage.setItem("token", "");
    window.location.replace("/");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let token = localStorage.getItem("token");
      let decoded = jwt_decode(token);
      let exp = decoded.exp;
      let date = Date.now();
      let dateCut = Math.round(date / 1000);
      if (exp < dateCut) logOut();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "primary.main",
        }}
      >
        <Toolbar sx={{ width: "100%" }}>
          {!drawer ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, alignSelf: "center" }}
          >
            {getTitle(view)}
          </Typography>
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                alt={data.firstName.charAt(0) + data.lastName.charAt(0)}
                src={getAvatar(data.username)}
                sx={{
                  color: "primary.main",
                  bgcolor: "white",
                  justifySelf: "center",
                }}
              >
                {data.firstName.charAt(0) + data.lastName.charAt(0)}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={drawer ? "permanent" : "persistent"}
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "primary.main",
          },
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List
            sx={{
              /* width: "100%",*/ maxWidth: 360,
              bgcolor: "transparent",
              marginTop: "1rem",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
              ></ListSubheader>
            }
          >
            <ListItemButton
              onClick={() => handleClickView("user")}
              sx={{ backgroundColor: "primary.main" }}
            >
              <ListItemIcon sx={{ color: "secondary.main" }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ color: "secondary.main" }}
              />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleClickView("teams")}
              sx={{ backgroundColor: "primary.main" }}
            >
              <ListItemIcon sx={{ color: "secondary.main" }}>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Teams" sx={{ color: "secondary.main" }} />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleClickView("tasks")}
              sx={{ backgroundColor: "primary.main" }}
            >
              <ListItemIcon sx={{ color: "secondary.main" }}>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Tasks" sx={{ color: "secondary.main" }} />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleClickView("userInfo")}
              sx={{ backgroundColor: "primary.main" }}
            >
              <ListItemIcon sx={{ color: "secondary.main" }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary="User Info"
                sx={{ color: "secondary.main" }}
              />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleClickView(logOut)}
              sx={{ backgroundColor: "primary.main" }}
            >
              <ListItemIcon sx={{ color: "secondary.main" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Log Out"
                sx={{ color: "secondary.main" }}
              />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          display: "grid",
          flexGrow: 1,
          p: 3,
          marginLeft: margin,
        }}
      >
        <Toolbar />
        <Box id="main">{getView(view)}</Box>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  );
}
