import {useState} from "react"
import { LoginModel } from "../../Models/LoginModel";
import { login } from "../../Services/LoginService";
import {toast, Toaster} from 'react-hot-toast';


export default function () {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginAction = ()=>{
    
    const loginModel:LoginModel = new LoginModel(email, password);

    login(loginModel)
    .then(response =>{
      localStorage.setItem("userToken", response.data.token)
    })
    .catch(error => {
      toast.error(error.response.data);
    })
  
  }
  return (
    <div>
      <div><Toaster/></div>
      <div className="Login-form-container">
        <form className="Login-form">
          <div className="Login-form-content">
            <h3 className="Login-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>{process.env.REACT_APP_TITLE}</label>
              <input
                id='email'
                name='email'
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email} onChange={(e)=>{setEmail(e.target.value)}}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                id='password'
                name='password'
                className="form-control mt-1"
                placeholder="Enter password"
                value={password} onChange={(e)=>{setPassword(e.target.value)}}

              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="button" onClick={loginAction} className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Dont have an account? <a href="/register">Register?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}