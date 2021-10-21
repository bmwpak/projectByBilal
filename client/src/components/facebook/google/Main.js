import {useState} from 'react';
import GoogleSelect from './GoogleSelect';


const Fb = () => {

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

  return(
    <>
    
  
    <div class="list-group-item" onClick={pressed}>Google</div>
    <div>      
      { hide === "none" }
      { hide === "selected" && <GoogleSelect /> }
    
          
    
    
  
</div>
    </>
  )
}

export default Fb;