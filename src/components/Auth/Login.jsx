import React, { useState } from "react";
import { Form, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthSlicer";
import axios from "axios";

function Login() {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    // console.log(userData);

    const [isLoading, setIsLoading] = useState(false);

    // const { setIdToken ,setIsLogin, setShow } = useContext(AuthContext);

    const handleChange = (e) => {
        // e.preventDefault();
        // console.log(e.target.name);
        // let value = e.target.value;
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // localStorage.setItem('userEmail', userData.email)

        try {
          setIsLoading(true);
          const res = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdmLPGX2tgKcChTn_7-xg6w00Cmr8czhE",
            {
            email: userData.email,
            password: userData.password,
            returnSecureToken: true,
            }
          );

          // if(res.status === 200) console.log(res.status)
          // localStorage.setItem("idToken", res.data.idToken);
          // setIdToken(res.data.idToken)
          toast("User Logged-In successfully👍");
          dispatch(authActions.login(res.data.idToken));
          navigate("/VerifyEmail");
        }
        catch(e) {
          toast(e.response.data.error.message);
        }
        setIsLoading(false);
        document.querySelector("form").reset();
    };


  return (
    <div>
      <ToastContainer />
      <h1 className="display-1 border-3 border-dark m-auto my-3 w-25 p-3 mt-10 text-center">
        Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="form m-auto my-3 w-25 p-3 shadow-lg rounded-3 bg-gradient"
        style={{ backgroundColor:"#245296" ,color:"white", fontWeight:"bold" }}
      >
        <div>
          <label  className="d-flex justify-content-center">E-mail Address</label>
          <input
            name="email"
            type="email"
            className="form-control"
            onChange={handleChange}
            // value={userData.email}
            placeholder="Enter Your Email Here"
            required
          />

          
          <Form.Text className="d-flex justify-content-center" style={{color: "white"}}>
            We'll never share your email with anyone else.
          </Form.Text>
        </div>

        <div className="mt-2">
          <label className="d-flex justify-content-center">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            onChange={handleChange}
            // value={userData.password}
            placeholder="Enter Your Password Here"
            required
          />
        </div>

        <div className="d-flex justify-content-center mt-2 gap-3">
        {/* <button
            type="submit"
            className="btn bg-gradient"
            style={{
              backgroundColor: "#d3dce8",
              color: "black",
              fontWeight: "bold",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Wait I'm Working🏃..." : "Login"}
          </button> */}

          {isLoading && "Wait I'm Working🏃..."}
          {!isLoading && <input type="submit" className="btn bg-gradient btn-secondary" style={{
              // backgroundColor: "#d3dce8",
              color: "white"
            }}
            value="Login"/>}

          <button
            id="btn"
            className="btn bg-gradient btn-secondary"
            onClick={() => dispatch(authActions.signupPage())}
            style={{
              // backgroundColor: "#d3dce8",
              color: "white"
            }}>
            New User?
          </button>

          <button 
            id="btn"
            className="btn bg-gradient btn-secondary"
            onClick={() => dispatch(authActions.showForgotPasswordModal())}
            style={{
              // backgroundColor: "#d3dce8",
              color: "white"
            }}>Forgot Password?</button>
        </div>
      </form>
    </div>
  );
}

export default Login;


