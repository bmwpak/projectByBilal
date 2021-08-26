
import loginImg from "./Images/login.jpg";
import './css/login.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useState , useContext } from "react";

import { UserContext } from "../App";

const Login = () => {

	const {state , dispatch} = useContext(UserContext);

	const history = useHistory();

	const [email , setEmail] = useState("");
	const [password ,setPassword] = useState("");

	const loginUser = async (e) => {
		e.preventDefault();

		const res = await fetch('./signin' , {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				email,
				password
			})
		});

		const data = res.json();

		if(res.status === 400 || !data)
		{
			window.alert("Invalid Credentials!");
		}else{

			dispatch({type:"USER" , payload : true});

			window.alert("Login successfull");

			history.push("/about");
		}

	};

  return(
    <>
	
	<div className="column">
		<div>
    <img className="login-image" src={loginImg} alt="login picture" />
	</div>
	    <div className="login-container mt-5 ml-1">
	
		<div className="card">
			<div className="card-header">
				<h3>Sign In</h3>
				
			</div>
			<div className="card-body">
				<form method="POST">
					<div className="remember">
						
						
						  <label htmlFor="email">
                                <i className="zmdi zmdi-email material-icons-name"></i>
                            </label>
                            <input type="email" name="email" id="email" autoComplete="off"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Your Email" />
					</div>
					<div className="remember">
					<label htmlFor="password">
                                <i className="zmdi zmdi-lock material-icons-name"></i>
                            </label>
						<input type="password" name="password" id="password" placeholder="Your Password" autoComplete="off"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="row align-items-center ml-1">
						<input type="checkbox" />Remember Me
					</div>
					<div className="form-group">
						<input type="submit" value="Login" className="btn float-right login_btn" 
						onClick={loginUser} 
						/>
					</div>
				</form>
			</div>
			<div className="card-footer">
				<div className="d-flex justify-content-center links">
					Don't have an account?<NavLink to="/signup">Sign Up</NavLink>
				</div>
				<div className="d-flex justify-content-center">
					<NavLink to="/reset">Forgot your password?</NavLink>
				</div>
			</div>
		</div>
	</div>

</div>
    </>
  )
}

export default Login;