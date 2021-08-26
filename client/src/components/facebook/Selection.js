import {useState} from 'react';
import './fb.css';
import NewCampaign from './campaign/newCampaign/NewCampaign';
import OldCampaign from './campaign/oldCampaign/OldCampaign';



const Selection = () => {

    const [ active , setActive ] = useState("new");

    

  return(
    <>
    <div class="container">
  <ul class="list-group">
  <li class="list-group-item" onClick={() => setActive("new")}>New Campaign</li>
  <li class="list-group-item" onClick={() => setActive("old")}>Already Existing Campaign</li>
  { active ==="new" && <NewCampaign />}
  { active === "old" && <OldCampaign />}
  </ul>
</div>
    </>
  )
}

export default Selection;