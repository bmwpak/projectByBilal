import {useState} from 'react';
import './fb.css';
import NewCampaign from './campaign/newCampaign/NewCampaign';
import OldCampaign from './campaign/oldCampaign/OldCampaign';



const Selection = (props) => {

    const [ active , setActive ] = useState("new");

    

  return(
    <>
    <div class="container">
  <div class="list-group">
  <div class="list-group-item" onClick={() => setActive("new")}>New Campaign</div>
  <div class="list-group-item" onClick={() => setActive("old")}>Already Existing Campaign</div>
  { active ==="new" && <NewCampaign preventDefault setCreateNew={props.setCreateNew} />}
  { active === "old" && <OldCampaign preventDefault />}
  </div>
</div>
    </>
  )
}

export default Selection;