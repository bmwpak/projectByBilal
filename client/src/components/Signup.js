
import Img from "./Images/signup.jpg";
import './css/signup.css';
import { NavLink , useHistory} from 'react-router-dom';
import { useState  } from "react";

const Signup = () => {

//data storage

	const history = useHistory();
	const [user , setUser] = useState({
		name:"",email:"",phone:"",profession:"",password:"",cpassword:""
	});


	const handleInputs = (e) => {
	const	name = e.target.name;
	const	value = e.target.value;

		setUser({ ...user , [name]:value});
	};

	const PostData = async (e) => {
		e.preventDefault();

		const {name,email,phone,profession,password,cpassword} = user;

		const res = await fetch("/register" , {
			method : "POST" ,
			headers : {
				"Content-Type" : "application/json"
			},
			body : JSON.stringify({
				name,email,phone,profession,password,cpassword
			})
		});

		const data = await res.json();

		if(res.status === 422 || !data){
			window.alert("Invalid Registration Data!");
			console.log("Invalid Registration Data!");
		}else{
			window.alert("Registration Successfull!");
			console.log("Registration Successfull!");

			history.push('/login');
		}

	};


	// design
  return(
    <>
    <div className="col">
		
	    <div className="container">
	
		<div className="card">
			<div className="card-header">
				<h3>Sign Up</h3>
				
			</div>
			<div className="card-body">
				<form method="POST">
          <div className="inputDesign">
								  <label htmlFor="name">
                                <i className="zmdi zmdi-account material-icons-name"></i>
                            </label>
                            <input type="name" name="name" id="name" autoComplete="off" placeholder="Full Name"
								value={user.name}
								onChange={handleInputs}		/>
					</div>
					<div className="inputDesign">
								  <label htmlFor="email">
                                <i className="zmdi zmdi-email material-icons-name"></i>
                            </label>
                            <input type="email" name="email" id="email" autoComplete="off" placeholder="Your Email"
								value={user.email}
								onChange={handleInputs} />
					</div>
          <div className="inputDesign">
								  <label htmlFor="phone">
                                <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                            </label>
                            <input type="text" name="phone" id="Phone" autoComplete="off" placeholder="Your Phone No."
								value={user.phone}
								onChange={handleInputs} />
					</div>
          <div className="inputDesign">
								  <label htmlFor="profession">
                                <i className="zmdi zmdi-slideshow material-icons-name"></i>
                            </label>
                            <input type="profession" name="profession" id="profession" autoComplete="off" placeholder="Your Profession" 
								value={user.profession}
								onChange={handleInputs}/>
					</div>
					<div className="inputDesign">
					<label htmlFor="password">
                                <i className="zmdi zmdi-lock material-icons-name"></i>
                            </label>
						<input type="password" name="password" id="password" placeholder="Your Password" autoComplete="off" 
								value={user.password}
								onChange={handleInputs}/>
					</div>

          <div className="inputDesign">
					<label htmlFor="cpassword">
                                <i className="zmdi zmdi-lock material-icons-name"></i>
                            </label>
						<input type="password" name="cpassword" id="cpassword" placeholder="Confirm Password" autoComplete="off" 
								value={user.cpassword}
								onChange={handleInputs}/>
					</div>
					
					<div className="form-group">
						<input type="submit" value="Register" className="btn float-right login_btn" 
						onClick={PostData} />
					</div>
				</form>
			</div>
			<div className="card-footer">
				
				<div className="d-flex justify-content-center">
        <NavLink to="/login">Already Have an Account</NavLink>
				</div>
			</div>
		</div>
	</div>
  <div>
    <img className="image" src={Img} alt="login picture" />
	</div>

</div>
    </>
  )
}

export default Signup;