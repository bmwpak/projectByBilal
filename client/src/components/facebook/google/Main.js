import {useState} from 'react';
import GoogleSelect from './GoogleSelect';


const Fb = () => {

  const [createNew , setCreateNew] = useState();

  
     // Google Ad price
     const [gPay , setgPay] = useState(0);

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

  return(
    <>
    
  
    <div class="list-group-item" onClick={pressed}>Google
    <span style={{marginLeft:"65%"}} >Rs. <b>{gPay}</b> (Per Day)</span>
    </div>
    <div>      
      { hide === "none" }
      { hide === "selected" && <GoogleSelect
                                gPay={gPay}
                                setgPay={setgPay} /> }
    
          
    
    
  
</div>
    </>
  )
}

export default Fb;