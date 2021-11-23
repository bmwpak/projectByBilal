import {useState,useEffect} from 'react';
import './fb.css';
import Selection from './Selection';
import Main from './google/Main';
import { useLocation , useHistory } from "react-router-dom";
import form from './campaign/newCampaign/Forms.tsx';

const Fb = () => {
  const location = useLocation();
  const choosenList = location.state.choosen;

  const history = useHistory();

    const [userData , setUserData] = useState({});

    // Facebook Ad price
    const [fbPay , setFbPay] = useState(0);

    const pay = () => {

      alert(form.body);

    };


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

  // alert(choosenList[0]);

  

  const [createNew , setCreateNew] = useState();

  // to change page
  const [ hide , showHide ] = useState("none");

  const pressed = (e) => { 
    
    if(hide == "none")
    {
      showHide("selected");
      e.preventDefault();
  }
    else if(hide == "selected")    
    {
      showHide("none");
      e.preventDefault();
    }
  
  }

  // const show = () =>{
  //   // if(choosenList[0] == 'Facebook'){
  //   //   <Selection  setCreateNew={setCreateNew}
  //   //    choosenList={choosenList}
  //   //    />
  //   // }else if(choosenList[0] == 'Google'){
  //   //   <Main />
  //   // }
  // }

//   useEffect(() => {

//     getData();

// } , []);

  return(
    <>
    <div class="container">
  <h2>Forms for Ads</h2>
  <div class="list-group">
    {(choosenList[0]  == 'Facebook'||choosenList[1] == 'Facebook')?<>
    <div class="list-group-item" onClick={pressed}>Facebook
    <span style={{marginLeft:"61%"}} >Rs. <b>{fbPay}</b> (Per Day)</span>
    </div>
    <div>      
      { hide === "none" }
      { hide === "selected" && 
      
      <Selection 
      fbPay={fbPay}
      setFbPay={setFbPay}
       setCreateNew={setCreateNew} />
     
    }
    </div>
    </>:null}{
    (choosenList[0] == 'Google'||choosenList[1] == 'Google')?(
   <Main />):null}
   
  </div>

  <br/><br/>
            <div class="col-md-12 text-left">
                 <button type="submit" class="btn btn-primary" style={{marginLeft:'15px'}} onClick={pay}  >Publish</button>
            </div>
</div>
    </>
  )
}

export default Fb;