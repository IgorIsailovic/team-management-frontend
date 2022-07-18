import React, { useState, useEffect } from "react";
import axios from "axios";
import igor from "../../images/igor.png";
import max from "../../images/max.jpg";
import lynda from "../../images/lynda.jpg";
import TaskModal from "./TaskModal";
import TaskCard from "./TaskCard";

export default function Task({ task, getUpdatedUserData, url }) {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [team, setTeam] = useState("");
  const [reporter, setReporter] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [assigniees, setAssigniees] = useState([]);

  function cardClick() {
    let token = localStorage.getItem("token");
    // console.log(task.id);
    axios
      .get(`${url}/tasks/${task.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        axios
          .all([
            axios.get(`${url}/users/getOne/${response.data.reporter}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get(`${url}/teams/${response.data.team}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ])
          .then(
            axios.spread((...responses) => {
              setFirstName(`${responses[0].data.firstName}`);
              setTeam(` ${responses[1].data.name}`);
              setReporter(getAvatar(responses[0].data.username));
            })
          )
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
    handleOpen();
  }

  const getAssigniees = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${url}/users/getUsersForTask/${task.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setAssigniees(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAssigniees();
  }, []);

  const getAvatar = (user) => {
    switch (user) {
      case "igor":
        return igor;
      case "max":
        return max;
      case "lynda":
        return lynda;
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <TaskModal
          task={task}
          open={open}
          handleClose={handleClose}
          firstName={firstName}
          team={team}
          reporter={reporter}
          getAssigniees={getAssigniees}
          assigniees={assigniees}
          getAvatar={getAvatar}
          getUpdatedUserData={getUpdatedUserData}
          url={url}
        ></TaskModal>
        <TaskCard
          task={task}
          cardClick={cardClick}
          getAssigniees={getAssigniees}
          assigniees={assigniees}
          getAvatar={getAvatar}
        ></TaskCard>
      </div>
    </>
  );
}
