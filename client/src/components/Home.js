import react ,{useEffect, useState} from 'react';
import './css/home.css';

const Home = () => {

  const [userName , setUserName] = useState('');

  const [show , setShow] = useState(false);

  const userHomePage = async () => {

    try{

      const res = await fetch("/getData" , {
        method:"GET",
        headers:{
          "Content-Type" : "application/json"
        }
      });

      const data = await res.json();

      setUserName( data.name);

      setShow(true);

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    }catch(err){
      console.log(err);


    }

  }

  useEffect(() => {

    userHomePage();

  } , []);

  return(
    <>
    <div className="main">
      <div className="middle">
    <p className="p">WELCOME</p>
    <h1 className="name">{userName}</h1>
    <h1 className="statement">{show ? 'Happy to have you back' : 'This is a platform for multi-advertising'}</h1>
    </div>
    </div>
    </>
  )
}

export default Home;