import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/auth.service";
import { loginUser } from "../../actions/auth";
import { connect } from "react-redux";
import "./styles.css";


const Login = (props) => {
   const {  loginUser, logged_in } = props;

      const [email, setEmail] = useState("smithwills1989@gmail.com");
      const [password, setPassword] = useState("12345678");

      let navigate = useNavigate();

     const onChangeEmail = (e) => {
       const email = e.target.value;
       setEmail(email);
     };

     const onChangePassword = (e) => {
       const password = e.target.value;
       setPassword(password);
     };

     const handleLogin = async (e) => {
       e.preventDefault();  
        const res = await login(email, password);
        console.log("newres", res)
         loginUser(res);
        navigate("dashboard");
     };

  //    if (isLoggedIn) {
  //   return <Redirect to="/dashboard" />;
  // }

  return (
    <div>
      <form className="loginForm">
        <div className="field">
          <div className="customInput">
            <input
              className="inputfield"
              type="email"
              placeholder="Email.."
              autoComplete="username"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
        </div>
        <div className="field">
          <div className="customInput">
            <input
              className="inputfield"
              type="password"
              placeholder="Password.."
              autoComplete="current-password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </div>
        <div className="field submitfield">
          <input
            className="submit"
            type="submit"
            value="SIGN IN"
            onClick={handleLogin}
          />
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    logged_in: state.logged_in,
    dispatch: state.dispatch,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (data) => dispatch(loginUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

