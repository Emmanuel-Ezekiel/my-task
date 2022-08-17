import axios from "axios";


const API_URL = "https://stage.api.sloovi.com/login";

export const login = (email, password) => {
  return axios
    .post(API_URL, {
      email,
      password,
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.results.token) {
        localStorage.setItem("NewUser", JSON.stringify(response.data.results));
        localStorage.setItem("UserToken", JSON.stringify(response.data.results.token));
        localStorage.setItem(
          "Company_id",
          JSON.stringify(response.data.results.company_id)
        );
      }
      return response.data;
    });
};



