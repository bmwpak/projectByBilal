import React ,{useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import './css/about.css';


const About = () => {

  const history = useHistory();

  const [userData , setUserData] = useState({});

  const callAboutPage = async () => {

    try{

      const res = await fetch("/about" , {
        method:"GET",
        headers:{
          Accept : "application/json",
          "Content-Type" : "application/json"
        },
        credentials : "include"
      });

      const data = await res.json();

      setUserData(data);

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    }catch(err){
      console.log(err);

      history.push('/login');

    }

  }

  useEffect(() => {

      callAboutPage();

  } , []);

  return(
    <>
    <div className="container-box">
        <form method="GET">
          <table>
            
          <tr>
              <td className="head" colSpan="2"><b>User Info</b></td>
            </tr>
            <tr>
              <td><b>User Id</b></td>
              <td className="answer">{userData._id}</td>
            </tr>
            <tr>
              <td><b>Name</b></td>
              <td className="answer">{userData.name}</td>
            </tr>
            <tr>
              <td><b>Email</b></td>
              <td className="answer">{userData.email}</td>
            </tr>
            <tr>
              <td><b>Phone</b></td>
              <td className="answer">+92 {userData.phone}</td>
            </tr>
            <tr>
              <td><b>Profession</b></td>
              <td className="answer">{userData.profession}</td>
            </tr>
          </table>
        </form>
      </div>
    </>
  )
}

export default About;