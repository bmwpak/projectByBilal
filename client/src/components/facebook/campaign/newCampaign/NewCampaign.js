import './NewCampaign.css';
import CampaignForm from './Forms.tsx';

const NewCampaign = () => {


  return(
    <>
    <div class="new-campaign-container">
  <ul class="list-group">
  <li class="new-item"><CampaignForm /></li>
  </ul>
</div>
    </>
  )
}

export default NewCampaign;