import axios from "axios";
import authHeader from "./auth-header";


const GET_URL = "https://stage.api.sloovi.com/team?product=outreach&company_id";

const GET_TASK =
  "https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/<task_id_from_previous_test>?company_id";

const user = JSON.parse(localStorage.getItem("Company_id"));


const getUserDetails = () => {
  return axios
    .get(`${GET_URL}=${user}`, { headers: authHeader() })
    .then((response) => {
      console.log(response.data);
      return response.data.results.data;
    });
};

const getSingleTask = () => {
     return axios
       .get(`${GET_TASK}=${user}`, { headers: authHeader() })
       .then((response) => {
         return response;
       });
   }

export default {
  getUserDetails,
  getSingleTask
};