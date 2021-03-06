import './NewCampaign.css';
import CampaignForm from './Forms.tsx';

const NewCampaign = (props) => {


  return(
    <>
    <div class="new-campaign-container">
  <div class="list-group">
  <div preventDefault class="new-item" ><CampaignForm 
                                        fbPay={props.fbPay}
                                        setFbPay={props.setFbPay}
                                        setCreateNew={props.setCreateNew} /></div>
  </div>
</div>
    </>
  )
}

export default NewCampaign;