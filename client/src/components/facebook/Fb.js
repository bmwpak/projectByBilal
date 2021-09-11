import {useState} from 'react';
import './fb.css';
import Selection from './Selection';

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
    <div class="container">
  <h2>Basic List Group</h2>
  <div class="list-group">
    <div class="list-group-item" onClick={pressed}>Facebook</div>
    <div>      
      { hide === "none" }
      { hide === "selected" && <Selection  setCreateNew={setCreateNew} />}
    </div>
  </div>
</div>
    </>
  )
}

export default Fb;