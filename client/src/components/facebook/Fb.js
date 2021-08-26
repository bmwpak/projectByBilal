import {useState} from 'react';
import './fb.css';
import Selection from './Selection';

const Fb = () => {

  const [ hide , showHide ] = useState("none");

  const pressed = () => { 
    
    if(hide == "none")
    {showHide("selected");}
    else if(hide == "selected")
    {showHide("none");}
  
  }

  return(
    <>
    <div class="container">
  <h2>Basic List Group</h2>
  <ul class="list-group">
    <li class="list-group-item" onClick={pressed}>Facebook</li>
    <div>      
      { hide === "none" }
      { hide === "selected" && <Selection />}
    </div>
    <li class="list-group-item">Second item</li>
    <li class="list-group-item">Third item</li>
  </ul>
</div>
    </>
  )
}

export default Fb;