import React, { useState, useEffect } from 'react';
import "./styles.css";
import { GrFormAdd} from 'react-icons/gr';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-bootstrap-time-picker";
import axios from "axios";
import authHeader from "../../service/auth-header";
import moment from "moment";
import UserService from "../../service/user.services";
import Task from "../Task/Task";
import { UserInfo } from "../../actions/auth";
import { connect } from "react-redux";
import EditTask from "../Edit-Task/Edit-Task";



const GET_URL =
  "https://stage.api.sloovi.com/team?product=outreach&company_id";

const POST_URL = "https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id";

const GET_TASK =
  "https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id";

const user = JSON.parse(localStorage.getItem("Company_id"));


const Dashboard = (props) => {

   const { getUser, UserInfo } = props;

  const [isOpen, setOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [ editOpen, setEditOpen ] = useState(false)
  const [time, setTime] = useState(0);
  const [startDate, setDate] = useState(new Date());
  const [userDetails, setUserDetails] = useState();
  const [inputValue, changeInputValue] = React.useState("");
  const [option, setOption] = useState("Saravanan C");


   const toggleDropdown = () => setOpen(!isOpen);
   const toggleDropdown2 = () => setTaskOpen(!taskOpen);
   const EditToggleDropdown = () => setEditOpen(!editOpen);


  
  //current time zone in seconds
  const date = moment.utc().format();
  const local = moment.utc(date).local().format();
  const currentTime = parseInt(Date.parse(local) / 1000);
  
  //Date Formatted
  const newdDate = moment(startDate).format("YYYY-MM-DD");

  //getALL Task;
  const getTask = () => {
    return axios
      .get(`${GET_TASK}=${user}`, { headers: authHeader() })
      .then((response) => {
        // setAllTask(response.data.results);
        return response.data.results;
      });
  };


  //Submit Task
  const handleSubmit = (e) => {
    e.preventDefault();
    toggleDropdown2();
    toggleDropdown();
    getTask();
    return axios
      .post(
        `${POST_URL}=${user}`,
        {
          assigned_user: option,
          task_date: newdDate,
          task_time: time,
          time_zone: currentTime,
          task_msg: inputValue,
          is_completed: 1,
        },
        {
          headers: authHeader() ,
        }
      )
      .then((response) => {
        UserInfo(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const handleTime = (selectedTime) => {
    setTime(selectedTime);
  };

  const selectDateHandler = (d) => {
    setDate(d);
    console.log(moment(startDate).format("YYYY-MM-DD"));
  };

  const onChange = (e) => {
    changeInputValue(e.target.value);
  };

  const handleChange = (e) => {
    setOption(e.target.value);
  };

  useEffect(() => {
    UserService.getUserDetails().then((response) => {
      setUserDetails(response);
    });
    UserService.getSingleTask();
  }, []);

  return (
    <div>
      <header>
        <nav></nav>
      </header>
      <main>
        <div className="Container">
          <div className="sideBar"></div>
          <div className="taskContainer">
            <div className="dropdown-header" onClick={toggleDropdown}>
              <span>Task</span>
              <div className="Plus">
                <GrFormAdd />
              </div>
            </div>
            <div className={`dropdown-body ${isOpen && "open"}`}>
              <form className="formContainer">
                <div className="Task">
                  <label htmlFor=""> Task Description</label>
                  <input type="text" value={inputValue} onChange={onChange} />
                </div>
                <div className="date-time">
                  <div className="date">
                    <label htmlFor="">Date</label>
                    <DatePicker
                      dateFormat="yyyy/MM/dd"
                      selected={startDate}
                      onChange={selectDateHandler}
                      todayButton={"Today"}
                    />
                  </div>
                  <div className="time">
                    <label htmlFor="">Time</label>
                    <TimePicker
                      start="00:00"
                      end="24:00"
                      step={1}
                      onChange={handleTime}
                      value={time}
                    />
                  </div>
                </div>
                <div className="User">
                  <label htmlFor="">Assign User</label>
                  {/* <input type="text" /> */}
                  <select onChange={handleChange}>
                    {userDetails?.map((option, index) => (
                      <option key={index} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  {/* <Select options={userDetails} /> */}
                </div>

                <div className="submitBtn">
                  <span onClick={toggleDropdown}>cancel</span>
                  <input
                    className="submit-form"
                    type="submit"
                    value="submit"
                    // onClick={handleLogin}
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            </div>
            <div className={`dropdown-down ${taskOpen && "open"}`}>
              {taskOpen && (
                <Task
                  allTask={getUser}
                  setEditOpen={EditToggleDropdown}
                  setTaskOpen={toggleDropdown2}
                />
              )}
            </div>
            <div className={`dropdown-down ${editOpen && "open"}`}>
              {editOpen && (
                <EditTask
                  allTask={getUser}
                  setEditOpen={EditToggleDropdown}
                  setOpenTask={toggleDropdown2}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    getUser: state.getUser,
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    UserInfo: (data) => dispatch(UserInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
