import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


const Ads = () => {

    const history = useHistory();

    const [userData , setUserData] = useState({});

  const getData = async () => {

    try{

      const res = await fetch("/about" , {
        method:"GET",
        headers:{
          
          "Content-Type" : "application/json"
        }
    
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

    const push = () => {
        history.push('/Show');
    }

    useEffect(() => {

        getData();
  
    } , []);

    return(
        <>
            <br/><br/>
            <div class="col-md-12 text-left">
                 <button type="submit" class="btn btn-primary" onClick={push} >Create an Ad</button>
            </div>
            <hr/>

        </>

    )

};

export default Ads;