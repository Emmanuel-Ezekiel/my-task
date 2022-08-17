import './style.css'
import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-bootstrap-time-picker";
import axios from "axios";
import authHeader from "../../service/auth-header";
import moment from "moment";
import { UserInfo } from "../../actions/auth";
import { connect } from "react-redux";
import UserService from "../../service/user.services";


   const UPDATE_URL =
      "https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/<task_id>?company_id";

    const DELETE_URL = "https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/<task_id>?company_id";


    const user = JSON.parse(localStorage.getItem("Company_id"));

const EditTask = (props) => {

  const { getUser, setEditOpen, setOpenTask } = props;
   const {
     task_date,
     task_msg,
     is_completed,
     time_zone,
     assigned_user,
     task_time,
   } = getUser;

  const [isOpen, setOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [time, setTime] = useState(task_time);
  const [startDate, setDate] = useState(new Date());
  const [userDetails, setUserDetails] = useState();
  const [inputValue, changeInputValue] = useState(task_msg);
  const [option, setOption] = useState("Saravanan C");

 



  const handleChange = (e) => {
    UserInfo({ ...getUser, task_msg: changeInputValue(e.target.value)});
  };

//   const onChange = (e) => {
//     changeInputValue(e.target.value);
//   };

  const newdDate = moment(startDate).format("YYYY-MM-DD");

  const handleTime = (selectedTime) => {
        UserInfo({ ...getUser,  task_time: setTime(selectedTime) });
  };

  const selectDateHandler = (d) => {
    UserInfo({ ...getUser,  task_date: setDate(d) });
  };


  useEffect(() => {
    UserService.getUserDetails().then((response) => {
      setUserDetails(response);
    });
  }, []);


  const Delete = () => {
     setEditOpen();
      UserInfo({});
    let answer = window.confirm("Delete?");
    if (answer) {
      return axios
        .delete(`${DELETE_URL}=${user}`, {
          headers: authHeader(),
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
  }



//update Submit
  const handleSubmit = (e) => {
    e.preventDefault();
      setOpenTask();
      setEditOpen();
    return axios
      .put(
        `${UPDATE_URL}=${user}`,
        {
          assigned_user: assigned_user,
          task_date: newdDate,
          task_time: time,
          time_zone: time_zone,
          task_msg: inputValue,
          is_completed: is_completed,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        UserInfo(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form className="form-Container">
        <div className="Task">
          <label htmlFor=""> Task Description</label>
          <input type="text" value={inputValue} onChange={handleChange} />
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
        <div className="updateBtn">
          <MdDelete
            className="deleteBtn"
            style={{ cursor: "Pointer" }}
            onClick={Delete}
          />
          <div className="submitBtn">
            <span onClick={setEditOpen} style={{ cursor: "Pointer" }}>
              cancel
            </span>
            <input
              className="submit-form"
              type="submit"
              value="submit"
              // onClick={handleLogin}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)( EditTask);
