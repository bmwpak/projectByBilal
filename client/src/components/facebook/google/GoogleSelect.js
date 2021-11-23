import {useState} from 'react';

import NewCampaign from './newCampaign/NewCampaign';



const GoogleSelect = (props) => {

    const [ active , setActive ] = useState("new");

    

  return(
    <>
    <div class="container">
  <div class="list-group">
  <div class="list-group-item" onClick={() => setActive("new")}>New Campaign</div>
  {/*   */}
  { active ==="new" && <NewCampaign preventDefault 
                        gPay={props.gPay}
                        setgPay={props.setgPay}
                        setCreateNew={props.setCreateNew} />}
  {/* { active === "old" && <OldCampaign preventDefault />} */}
  </div>
</div>
    </>
  )
}

export default GoogleSelect;