import React from 'react';
import './task.css';
import { MdModeEdit } from "react-icons/md";
import { GrFormCheckmark } from "react-icons/gr";
import { IoIosNotifications } from "react-icons/io";

const Task = ({ allTask, setEditOpen, setTaskOpen }) => {

  return (
    <div className="task">
      <div>
        <div className="user-con">
          <div className="user-info">
            <img src={allTask?.assigned_user_icon} alt="" />
            <div className="task-info">
              <span>{allTask?.task_msg}</span>
              <span>{allTask?.task_date}</span>
            </div>
          </div>
          <div className="icon">
            <MdModeEdit
              className="iconBtn"
              onClick={() => {
                setEditOpen();
                setTaskOpen();
              }}
              style={{ cursor: "Pointer" }}
            />
            <IoIosNotifications className="iconBtn" />
            <GrFormCheckmark className="iconBtn" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;