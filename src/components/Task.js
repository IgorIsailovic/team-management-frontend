import React, { useState, useEffect } from "react";
import axios from "axios";
import nikola from "../images/ceks.png";
import igor from "../images/igor.png";
import milan from "../images/milan.png";
import TaskModal from "./TaskModal";
import TaskCard from "./TaskCard";

export default function Task({ task, getUpdatedUserData, url }) {
  const [open, setOpen] = useState(false);
  const [taskResult, setTaskResult] = useState("");
  const [taskResult1, setTaskResult1] = useState("");
  const [assigner, setAssigner] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [assagnies, setAssagnies] = useState([]);

  function cardClick() {
    let token = localStorage.getItem("token");
    console.log(task.id);
    axios
      .get(`${url}/tasks/${task.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        axios
          .all([
            axios.get(`${url}/users/getOne/${response.data.assigner}`, {
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
              setTaskResult(`${responses[0].data.firstName}`);
              setTaskResult1(` ${responses[1].data.name}`);
              setAssigner(getAvatar(responses[0].data.username));
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

  const getAssagnies = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${url}/users/getUsersForTask/${task.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setAssagnies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAssagnies();
  }, []);

  const getAvatar = (user) => {
    switch (user) {
      case "igor":
        return igor;
      case "nikola":
        return nikola;
      case "milan":
        return milan;
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
          taskResult={taskResult}
          taskResult1={taskResult1}
          assigner={assigner}
          getAssagnies={getAssagnies}
          assagnies={assagnies}
          getAvatar={getAvatar}
          getUpdatedUserData={getUpdatedUserData}
          url={url}
        ></TaskModal>
        <TaskCard
          task={task}
          cardClick={cardClick}
          getAssagnies={getAssagnies}
          assagnies={assagnies}
          getAvatar={getAvatar}
        ></TaskCard>
      </div>
    </>
  );
}
