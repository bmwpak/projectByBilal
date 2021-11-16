import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './css/ads.css';


const Ads = () => {

    const history = useHistory(); 
  
    const [userFacebookData , setUserFacebookData] = useState([]);

  const getFacebookData = async () => {

    try{

      const res = await fetch("/getFacebookData" , {
        method:"GET",
        headers:{
          
            Accept : "application/json",
            "Content-Type" : "application/json"
          },
          credentials : "include"
    
      });

      const data = await res.json();

      setUserFacebookData(data);


      console.log(userFacebookData);
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    }catch(err){
      console.log(err);

      history.push('/login');

    }

  }

  const [userGoogleData , setUserGoogleData] = useState([]);

  const getGoogleData = async () => {

    try{

      const res = await fetch("/getGoogleData" , {
        method:"GET",
        headers:{
          
            Accept : "application/json",
            "Content-Type" : "application/json"
          },
          credentials : "include"
    
      });

      const data = await res.json();

      setUserGoogleData(data);


      console.log(userGoogleData);
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    }catch(err){
      console.log(err);

      history.push('/login');

    }

  }

  // redirect to login page if no token
    const push = () => {
        history.push('/Show');
    }

    useEffect(() => {

        getFacebookData();
        getGoogleData();
  
    } , []);

    return(
        <>
            <br/><br/>
            <div class="col-md-12 text-left">
                 <button type="submit" class="btn btn-primary" style={{marginLeft:'15px'}} onClick={push} >Create an Ad</button>
            </div>
            <hr/>
            <span style={{fontWeight:'bold',marginLeft:'4%',fontSize:'20px'}}>Google Ads</span><br/>
            <hr/>
            <div>
            <table>
            
                <tr>
                    <th style={{width:'40px'}}>No.</th>
                    <th>Business Name</th>
                    <th>Website</th>
                    <th>Location</th>
                    <th>Upload Time</th>
                </tr>
            {userGoogleData.map((post,index)=>(<>        
                <tr>
                    <td style={{width:'40px'}}><span key={index}>{index+1}</span></td>
                    <td><span key={index}>{post.businessName}</span></td>
                    <td><span key={index}>{post.website}</span></td>
                    <td><span key={index}>{post.adsetLocation}</span></td>
                    <td><span key={index}>{post.time}</span></td>
                
                </tr>
                </>
            ))}
            </table>
            </div>
            <hr/>
            <span style={{fontWeight:'bold',marginLeft:'4%',fontSize:'20px'}}>Facebook Ads</span><br/>
            <hr/>
            <div>
            <table>
            
                <tr>
                    <th style={{width:'40px'}}>No.</th>
                    <th>Campaign Name</th>
                    <th>Adset Name</th>
                    <th>Ad Name</th>
                    <th>Upload Time</th>
                </tr>
            {userFacebookData.map((post,index)=>(<>        
                <tr>
                    <td style={{width:'40px'}}><span key={index}>{index+1}</span></td>
                    <td><span key={index}>{post.CampaignName}</span></td>
                    <td><span key={index}>{post.AdsetName}</span></td>
                    <td><span key={index}>{post.AdName}</span></td>
                    <td><span key={index}>{post.time}</span></td>
                
                </tr>
                </>
            ))}
            </table>
            </div>
            


        </>

    )

};

export default Ads;