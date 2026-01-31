import { useEffect, useState } from "react";
import { Input } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { loginUserFailure, loginUserStart, loginUserSuccess } from "../slice/auth";
import AuthService from "../service/auth";
import {ValidationError} from "./";
import { useNavigate } from "react-router-dom";
import { logo } from "../constants";

const Login = () => {
   const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const {isLoading, loggedIn} = useSelector(state => state.auth)
  const navigate = useNavigate()

  const loginHandler = async (e) => {
    e.preventDefault()
    dispatch(loginUserStart())
    const user = {email, password}
    try {
      const response = await AuthService.userLogin(user)
      console.log(response);
      navigate('/')
      dispatch(loginUserSuccess(response.user))
    } catch (error) {
      
      dispatch(loginUserFailure(error.response?.data.errors))
    }
  }

  useEffect(() => {
     if(loggedIn) {
      navigate('/')
     }
  }, [loggedIn])
  
  return (
     <div className="text-center">
      <main className="form-signin w-25 m-auto">
        <img src={logo} alt="logo" width={200} style={{marginBottom: "-20px", marginTop: "40px"}}/>
        <form>
          <h1 className="h3 mt-5 mb-3 fw-normal">Please login</h1>
          <ValidationError/>
           <Input label='Email address' type="email" state={email} setState={setEmail}/>
           <Input label='Password' type="password" state={password} setState={setPassword}/>
          
          <button className="btn btn-primary mt-2 w-100 py-2" disabled={isLoading} onClick={loginHandler} type="submit">
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </main>
    </div>
  )
}

export default Login
