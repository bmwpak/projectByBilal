
import loginImg from "./Images/login.jpg";
import './css/login.css';
import {  useHistory } from 'react-router-dom';
import { useState } from "react";

import { UserContext } from "../App";

const ResetPassword = () => {

    const history = useHistory();

	const [email , setEmail] = useState("");

	const resetUser = async (e) => {
		e.preventDefault();

		const res = await fetch('/reset-password' , {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				email
			})
		});

		const data = res.json();

		if(res.status === 422 || !data)
		{
			window.alert("Email Field Empty!");
		}else{

			
			window.alert("Check Your Email");

			history.push("/login");
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
					
				
					<div className="form-group">
						<input type="submit" value="Login" className="btn float-right login_btn" 
						onClick={resetUser} 
						/>
					</div>
				</form>
			</div>
			
		</div>
	</div>

</div>
    </>
  )
}

export default ResetPassword;