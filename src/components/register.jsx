import { useState, useEffect } from "react";
import { Input } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { registerUserFailure, registerUserStart, registerUserSuccess } from "../slice/auth";
import AuthService from "../service/auth";
import { ValidationError } from "./";
import { useNavigate } from "react-router-dom";
import { logo } from "../constants";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, loggedIn } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(registerUserStart());
    try {
      const response = await AuthService.userRegister({ username, email, password });
      dispatch(registerUserSuccess(response.user));
      navigate('/');
    } catch (error) {
      dispatch(registerUserFailure(error.response?.data?.errors));
    }
  };

  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn, navigate]);

  return (
    <div className="text-center">
      <main className="form-signin w-25 m-auto">
        <img src={logo} alt="logo" width={200} style={{ marginBottom: "-20px", marginTop: "40px" }} />
        <form>
          <h1 className="h3 mt-5 mb-3 fw-normal">Please register</h1>
          <ValidationError />
          <Input label='Username' state={username} setState={setUsername} />
          <Input label='Email address' type="email" state={email} setState={setEmail} />
          <Input label='Password' type="password" state={password} setState={setPassword} />
          <button className="btn btn-primary mt-2 w-100 py-2" disabled={isLoading} onClick={registerHandler} type="submit">
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;


