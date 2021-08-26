import React ,{useEffect, useState} from 'react';
import './css/contact.css';
import addressPic from './Images/address.png';
import emailPic from './Images/email.png';
import phonePic from './Images/phone.jpg';

const Contact = () => {

  const [userData , setUserData] = useState({
    name:"",email:"",phone:"",message:""
  });

  const userContact = async () => {

    try{

      const res = await fetch("/getData" , {
        method:"GET",
        headers:{
          "Content-Type" : "application/json"
        }
      });

      const data = await res.json();

      setUserData({ ...userData , name:data.name , email:data.email ,phone :data.phone ,message:data.message});

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    }catch(err){
      console.log(err);


    }

  }

  useEffect(() => {

    userContact();

  } , []);

  // stroing data in state

  const inputs = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData , [name]:value});

  };

  //storing data in database

  const contactForm = async (e) => {
      e.preventDefault();

      const {name, email, phone, message} = userData;

      const res = await fetch('/contact' , {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name, email, phone, message
        })
      });

      const data = await res.json();

      if(res.status === 422 || !data){
        alert("Message not Send");
        console.log("Message not send");
      }else{
        alert("Message Send");
        setUserData({ ...userData , message: ""});
      }
  };

  return(
    <>
    <div className="wrapper">
        <div className="first">
          <div className="photo">
          <img className="picture" src={phonePic} />
          </div>
          <div className="content">
          <h6>Phone</h6>
          </div>
          <div className="syntax">
          +92 322 123 1111
          </div>
        </div>
        <div className="second">
          <div className="photo">
          <img className="picture" src={emailPic} />
          </div>
          <div className="content">
            <h6>Email</h6>
          </div>
          <div className="syntax">
            john@gmail.com
          </div>
        </div>
        <div className="third">
        < div className="photo">
            <img className="picture" src={addressPic} />
          </div>
          <div className="content">
          <h6>Address</h6>
          </div>
          <div className="syntax">
            Karachi,Pakistan
          </div>
        </div>
    </div>

    <div className="msg-box">
        <div > 
          <h3 className="h3" >Get In Touch</h3>

          <form method="POST">
            <div className="contact-form-name d-flex justify-content-between align-items-center">
              <input type="text" id="contact-form-name"
              className="contact-form-name input-field"
              onChange={inputs} name="name"
              value={userData.name}
              placeholder="Your Name" required="true" />

              <input type="text" id="contact-form-name"
              className="contact-form-name input-field"
              onChange={inputs} name="email"
              value={userData.email}
              placeholder="Your Email" required="true" />

              <input type="text" id="contact-form-name"
              className="contact-form-name input-field mr-5"
              onChange={inputs} name="phone"
              value={userData.phone}
              placeholder="Your Phone No." required="true" />
            </div>

            <div >
              <textarea className="msg mt-3" placeholder="Your Message"
              onChange={inputs} name="message"
              value={userData.message}
              cols="76" rows="7"></textarea>
            </div>

            <div className="form-group mt-2">
						<input type="submit" value="Send" className="send btn float-left login_btn" 
            onClick={contactForm} />
					</div>

          </form>
        </div>
    </div>
    </>
  )
}

export default Contact;