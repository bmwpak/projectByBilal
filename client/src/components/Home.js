import react ,{useEffect, useState} from 'react';

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
    <p>WELCOME</p>
    <h1>{userName}</h1>
    <h1>{show ? 'Happy to have you back' : 'WE ARE THE MERN DEVELOPERS'}</h1>

    </>
  )
}

export default Home;